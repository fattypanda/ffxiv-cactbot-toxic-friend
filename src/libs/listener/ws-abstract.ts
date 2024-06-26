
export class EventEmitter {
	/* Copyright (c) 2011 Jerome Etienne, http://jetienne.com - MIT License */
	
	public _events: {[x: string]: Function[]};
	
	constructor() {
		this._events = {}
	}
	
	on(event: string, fct: Function) {
		this._events[event] = this._events[event] || []
		this._events[event].push(fct)
	}
	
	off(event: string, fct: Function) {
		if(!(event in this._events)) return
		this._events[event].splice(this._events[event].indexOf(fct), 1)
	}
	
	emit(event: string, ...args: any[]) {
		if(!(event in this._events)) return
		for(let e of this._events[event]) {
			e.apply(this, [].slice.call(args, 1))
		}
	}
}

export const resolveSockURI = function() {
	let o = /[?&](HOST_PORT|OVERLAY_WS)=(wss?:\/\/[^&\/]+)/.exec(location.search)
	return o && o[2];
}

export const RECONNECT_TIMEOUT = 2000
export const RECONNECT_RETRY = 5

export const WS_REQUEST_COMMAND = {
	'end': 'RequestEnd',
	'capture': 'Capture'
}

export type ILayerFeature = any;

export class Layer extends EventEmitter {
	
	public type: boolean | string;
	public features: string[];
	public status: {[x: string]: any};
	
	constructor() {
		super()
		
		this.type = false
		this.features = []
		this.status = {}
		
		window.addEventListener('message', e => {
			this.emit('message', {
				type: 'window',
				message: e.data
			})
		})
	}
	supports(feature: string) {
		return this.features.indexOf(feature) !== -1
	}
	connect(): boolean | void { return true }
	// @ts-ignore
	request(feature: string): boolean | undefined { return false }
}

export class WSLayer extends Layer {
	
	public uri: string | null;
	public canRetry: number;
	public retryTimeout: number | null;
	public _overlayid: string;
	
	public ws: WebSocket | undefined;
	
	constructor() {
		super()
		
		this.type = 'ws'
		this.features = ['end', 'capture']
		
		this.uri = resolveSockURI()
		
		if(this.uri === 'ws://:10501') {
			this.uri = 'ws://localhost:10501'
		}
		this.uri += '/MiniParse'
		
		this.canRetry = RECONNECT_RETRY
		this.retryTimeout = null
		this._overlayid = ''
		
		window.addEventListener('message', e => {
			this.emit('message', e.data)
		})
	}
	
	connect() {
		if(!this.uri) return false
		this.ws = new WebSocket(this.uri)
		
		this.ws.onmessage = e => {
			this.canRetry = RECONNECT_RETRY
			this._onmessage(e)
		}
		this.ws.onerror = e => {
			this.ws?.close();
			console.error(e)
		}
		this.ws.onclose = e => {
			if(!this.canRetry) return
			this.emit('closed', {
				code: e.code,
				reconnecting: this.canRetry--
			})
			this.retryTimeout = setTimeout(_ => {
				this.connect()
			}, 2000)
		}
		
	}
	
	request(feature: string) {
		if(!(feature in WS_REQUEST_COMMAND)) {
			return false
		}
		if('overlayWindowId' in window && this._overlayid !== window.overlayWindowId) {
			this._overlayid = window.overlayWindowId as string;
			this._send({ // WHY THE FUCK
				type: 'set_id',
				id: this._overlayid
			})
		}
		this._send({
			type: 'overlayAPI',
			to: this._overlayid,
			msgtype: WS_REQUEST_COMMAND[feature],
			msg: undefined
		})
	}
	
	_send(m: string | { [x: string]: any }) {
		if(this.ws?.readyState === 1) {
			if(typeof m === 'string') {
				this.ws.send(m)
			} else {
				this.ws.send(JSON.stringify(m))
			}
			return true
		} else return false
	}
	
	_onmessage(e: any) {
		if(e.data === '.') {
			this._send('.') // pong!
			return
		}
		
		let d: any;
		
		try {
			d = JSON.parse(e.data)
		} catch(err) {
			console.error(err, e.data)
			return
		}
		
		if(d.type === 'broadcast') {
			
			switch(d.msgtype) {
				case 'broadcast':
					this.emit('message', {
						type: 'broadcast',
						from: d.from,
						message: d.msg
					})
					break
				
				case 'CombatData':
					this.emit('data', d.msg)
					break
				
			}
		} else if(d.type === 'send') {
			this.emit('message', {
				type: 'single',
				from: d.from,
				message: d.msg
			})
		} else if(d.type === 'set_id') {
			this._overlayid = d.id
		}
		
	}
	
}

interface LegacyLayerEvent extends Event {
	detail: {
		isLocked: string;
		message: string;
		opcode: number;
		timestamp: string;
		payload: any[];
	}
}

export class LegacyLayer extends Layer {
	
	public connected: boolean;
	
	constructor() {
		super()
		this.type = 'legacy'
		this.connected = false
		this.features = []
		
		this.status.locked = false
		// @ts-ignore
		if(window?.OverlayPluginApi?.endEncounter) {
			this.features.push('end')
		}
	}
	
	connect() {
		if(this.connected) return
		document.addEventListener('onOverlayDataUpdate', (event) => {
			const e = event as LegacyLayerEvent;
			this.emit('data', e.detail)
		})
		document.addEventListener('onOverlayStateUpdate', (event) => {
			const e = event as LegacyLayerEvent;
			this.status.locked = e.detail.isLocked
			this.emit('status', {
				type: 'lock',
				message: e.detail.isLocked
			})
		})
		document.addEventListener('onBroadcastMessageReceive', (event) => {
			const e = event as LegacyLayerEvent;
			this.emit('message', {
				type: 'broadcast',
				message: e.detail.message
			})
		})
		document.addEventListener('onRecvMessage', (event) => {
			const e = event as LegacyLayerEvent;
			this.emit('message', {
				type: 'single',
				message: e.detail.message
			})
		})
		document.addEventListener('onLogLine', (event) => {
			const e = event as LegacyLayerEvent;
			let d = e.detail
			if(d.opcode !== undefined) {
				if(d.opcode !== 56) {
					this.emit('logline', {
						type: 'logline',
						opcode: d.opcode,
						timestamp: d.timestamp,
						payload: d.payload
					})
				} else {
					this.emit('echo', d.payload[3])
				}
			} else {
				this.emit('echo', d.message)
			}
		})
		this.connected = true
	}
	
	request(feature: string) {
		if(feature === 'end') {
			// @ts-ignore
			window?.OverlayPluginApi?.endEncounter?.();
			return true
		}
		return false
	}
}

let layer: WSLayer | LegacyLayer;

if(resolveSockURI()) {
	layer = new WSLayer()
} else {
	layer = new LegacyLayer()
}

export default layer;

// window.WSLayer = WSLayer
// window.LegacyLayer = LegacyLayer
//
// if(resolveSockURI()) {
// 	window.layer = new WSLayer()
// } else {
// 	window.layer = new LegacyLayer()
// }
