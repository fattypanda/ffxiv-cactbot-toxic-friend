import {IRow} from "@/type";
import {parsed15or16} from "@/regexes";
import Damage from "@/Damage";
import _ from 'lodash-es';
import {IThan} from "@/dict";

export class Bus {
	
	public rules: IRow[] = [];
	
	constructor() {

	}
	
	start (rules: IRow[]) {
		this.rules = rules;
	}
	
	stop () {
		this.rules = [];
	}
	
	handle (log: string) {
		const match = parsed15or16(log);
		if (match) {
			const {
				source: player,
				// target: target,
				ability: skill,
				damage: _damage,
				flags: _flags,
			} = match.groups || {};
			
			const damage = Damage.damage(_damage).toString();
			const flags = Damage.flagsMask(_flags);
			
			console.log(player, skill, damage, flags);
			
			this.rules.map((row) => {
				const result = _.every([
					this.__player(player, row.player),
					// this.__target(target, row.target),
					this.__skill(skill, row.skill),
					this.__damage(damage, row.damage, row.than),
					this.__flags(flags, row.flag),
				]);
				console.log(row, result);
			});
		}
	}
	
	private __player (log: string, v: string) {
		console.log('[player]', ...arguments);
		return v? v === log: true;
	}
	
	private __skill (log: string, v: string) {
		console.log('[skill]', ...arguments);
		return v? v === log: true;
	}
	
	private __damage (log: string, v: string, than: IThan) {
		console.log('[damage]', ...arguments);
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
		console.log('[flags]', ...arguments);
		return v? v === log: true;
	}
}
