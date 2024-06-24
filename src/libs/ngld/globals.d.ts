export namespace Listener {
	
	export namespace CombatData {
		
		export type Event = 'CombatData';
		
		export type Callback = (data: {
			title: string;
			duration: string;
			ENCDPS: string;
		}) => any;
	}
	
	export namespace LogLine {
		
		export type Event = 'LogLine';
		
		export type Callback = (data: {
			// Array(String 数据1, String 数据2, ...) 包含一个分割处理过的日志行数据数组。
			line: string[];
			// String 日志行 包含未经处理的日志行字符串，采用网络日志行格式。
			rawLine: string;
		}) => any;
	}
	
	export namespace ImportedLogLines {
		
		export type Event = 'ImportedLogLines';
		
		export type Callback = (data: {
			// Array(String 日志行) 一个包含每个日志行字符串的数组。
			logLines: string[];
		}) => any;
	}
	
	export namespace ChangeZone {
		
		export type Event = 'ChangeZone';
		
		export type Callback = (data: {
			// Int 区域ID 新区域的ID
			zoneID: number;
		}) => any;
	}
	
	export namespace ChangePrimaryPlayer {
		
		export type Event = 'ChangePrimaryPlayer';
		
		export type Callback = (data: {
			// String 角色ID 玩家的实体ID
			charID: string;
			// String 角色名 玩家的角色名字
			charName: string;
		}) => any;
	}
	
	export namespace OnlineStatusChanged {
		
		export type Event = 'OnlineStatusChanged';
		
		export type Callback = (data: {
			// String 目标 状态变更所属目标的实体ID
			target: string;
			// Int 原始状态代码 状态代码(例如12)
			rawStatus: number;
			// String 状态文本 状态的描述字符串。可能的值为: Online, Busy, InCutscene, AFK, LookingToMeld, RP, LookingForParty
			status: string;
		}) => any;
	}
	
	export namespace PartyChanged {
		
		export type Event = 'PartyChanged';
		
		export type Callback = (data: {
			// Array(Array 小队成员1, Array 小队成员2, ...) 其中包含小队成员名单。
			party: {
				// String 实体ID 实体ID
				id: string;
				// String 角色名 角色名
				name: string;
				// Int 世界ID 原始世界ID
				worldId: number;
				// Int 职业ID 职业ID
				job: number;
				// Bool true 如果这个角色在玩家的队伍中的话肯定为True
				inParty: boolean;
			}[];
		}) => any;
	}
	
	export namespace BroadcastMessage {
		
		export type Event = 'BroadcastMessage';
		
		export type Callback = (data: {
			// String 来源 表明来源的字符串。;
			source: string;
			// [Object] 消息正文 消息正文内容。
			msg: any;
		}) => any;
	}
}


declare global {
	
	// 当玩家战斗时，每秒发送一次此事件。
	declare function addOverlayListener (event: Listener.CombatData.Event, callback: Listener.CombatData.Callback): never;
	
	// 每个日志行产生时发送此事件。使用网络日志行格式，即每部分数据使用 | 分割。
	declare function addOverlayListener (event: Listener.LogLine.Event, callback: Listener.LogLine.Callback): never;
	
	// 在导入日志时，每秒发送一次此事件。
	declare function addOverlayListener (event: Listener.ImportedLogLines.Event, callback: Listener.ImportedLogLines.Callback): never;
	
	// 每当玩家登录或移动到一个新的区域或副本时发送此事件。
	declare function addOverlayListener (event: Listener.ChangeZone.Event, callback: Listener.ChangeZone.Callback): never;
	
	// 每当玩家登录或玩家变化时发送此事件。
	declare function addOverlayListener (event: Listener.ChangePrimaryPlayer.Event, callback: Listener.ChangePrimaryPlayer.Callback): never;
	
	// 每当玩家或附近角色的在线状态发生变化时发送此事件。
	declare function addOverlayListener (event: Listener.OnlineStatusChanged.Event, callback: Listener.OnlineStatusChanged.Callback): never;
	
	// 每次小队成员发生变化时或小队进入新的区域时发送此事件。
	declare function addOverlayListener (event: Listener.PartyChanged.Event, callback: Listener.PartyChanged.Callback): never;
	
	// 每当任何悬浮窗调用 broadcast callOverlayHandler 方法时发送此事件。
	declare function addOverlayListener (event: Listener.BroadcastMessage.Event, callback: Listener.BroadcastMessage.Callback): never;
	
	declare function addOverlayListener (event: string, callback: () => any): never;
	
	// 当玩家战斗时，每秒发送一次此事件。
	declare function removeOverlayListener (event: Listener.CombatData.Event, callback: Listener.CombatData.Callback): never;
	
	// 每个日志行产生时发送此事件。使用网络日志行格式，即每部分数据使用 | 分割。
	declare function removeOverlayListener (event: Listener.LogLine.Event, callback: Listener.LogLine.Callback): never;
	
	// 在导入日志时，每秒发送一次此事件。
	declare function removeOverlayListener (event: Listener.ImportedLogLines.Event, callback: Listener.ImportedLogLines.Callback): never;
	
	// 每当玩家登录或移动到一个新的区域或副本时发送此事件。
	declare function removeOverlayListener (event: Listener.ChangeZone.Event, callback: Listener.ChangeZone.Callback): never;
	
	// 每当玩家登录或玩家变化时发送此事件。
	declare function removeOverlayListener (event: Listener.ChangePrimaryPlayer.Event, callback: Listener.ChangePrimaryPlayer.Callback): never;
	
	// 每当玩家或附近角色的在线状态发生变化时发送此事件。
	declare function removeOverlayListener (event: Listener.OnlineStatusChanged.Event, callback: Listener.OnlineStatusChanged.Callback): never;
	
	// 每次小队成员发生变化时或小队进入新的区域时发送此事件。
	declare function removeOverlayListener (event: Listener.PartyChanged.Event, callback: Listener.PartyChanged.Callback): never;
	
	// 每当任何悬浮窗调用 broadcast callOverlayHandler 方法时发送此事件。
	declare function removeOverlayListener (event: Listener.BroadcastMessage.Event, callback: Listener.BroadcastMessage.Callback): never;
	
	declare function removeOverlayListener (event: string, callback: () => any): never;
	
	declare function callOverlayHandler (parameters: any): never;
	
	declare function startOverlayEvents(): never;
	
	// interface Window {
	// 	myGlobalFunction: () => void;
	// }
}

export {}; // 确保它是一个模块

