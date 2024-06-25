import {IRow} from "@/type";
import {network21or22} from "@/regexes";
import Damage from '@/libs/ngld/Damage';
import PostNamazu from "@/libs/ngld/PostNamazu";
import _ from 'lodash-es';
import {IThan} from "@/dict";
import {Listener} from "@/libs/ngld/globals";

export class Bus {
	
	public rules: IRow[] = [];
	public debug: boolean = false;
	
	constructor() {
	
	}
	
	start (rules: IRow[]) {
		this.rules = rules;
		addOverlayListener('LogLine', this.handleLogLine);
	}
	
	stop () {
		this.rules = [];
		removeOverlayListener('LogLine', this.handleLogLine);
	}
	
	handleLogLine (data: Parameters<Listener.LogLine.Callback>[0]) {
		if (data?.rawLine) this.handle(data.rawLine);
	}
	
	postNamazu(echo: string) {
		PostNamazu('command', echo);
	}
	
	handle (log: string, analysis = network21or22) {
		const match = analysis(log);
		if (match) {
			const {
				source: player,
				// target: target,
				ability: skill,
				damage: _damage,
				flags: _flags,
			} = match.groups || {};
			
			const damage = Damage.damage(_damage).toString();
			const flags = Damage.flags(_flags) || '00';
			
			if (this.debug) console.log(player, skill, damage, flags);
			
			this.rules.map((row) => {
				if (row.echo) {
					const result = _.every([
						this.__player(player, row.player),
						// this.__target(target, row.target),
						this.__skill(skill, row.skill),
						this.__damage(damage, row.damage, row.than),
						this.__flags(flags, row.flag),
					]);
					if (this.debug) console.log(row, result);
					if (result) {
						const txt = row.echo
							.replace(/\$\{player\}/g, player)
							.replace(/\$\{skill\}/g, skill)
							.replace(/\$\{damage\}/g, damage)
						
						this.postNamazu(txt);
					}
				}
			});
		}
	}
	
	private __player (log: string, v: string) {
		if (this.debug) console.log('[player]', ...arguments);
		return v? v === log: true;
	}
	
	private __skill (log: string, v: string) {
		if (this.debug) console.log('[skill]', ...arguments);
		return v? v === log: true;
	}
	
	private __damage (log: string, v: string, than: IThan) {
		if (this.debug) console.log('[damage]', ...arguments);
		if (!v) {
			return true;
		} else {
			switch (than) {
				case "!=": return log !== v;
				case "==": return log === v;
				case ">": return log > v;
				case ">=": return log >= v;
				case "<": return log < v;
				case "<=": return log <= v;
				default: return true;
			}
		}
	}
	
	private __flags (log: string, v: string) {
		if (this.debug) console.log('[flags]', ...arguments);
		return v? v === log: true;
	}
}
