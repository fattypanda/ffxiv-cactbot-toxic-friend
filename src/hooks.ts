import {IRow} from "@/type";

export function rowToRule(data: Partial<IRow>) {
	const {player, skill, damage, than, flag} = data || {};
	let text = '';
	
	if (player) text += `当玩家 <span class="el-text el-text--primary el-text--small">${player}</span> `;
	if (!player) text += `任意玩家`;
	if (skill) text += `使用技能 <span class="el-text el-text--success el-text--small">${skill}</span> `;
	if (!skill) text += `使用任意技能`;
	if (damage && than) {
		if (than === '>') text += `造成伤害大于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
		if (than === '>=') text += `造成伤害大于等于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
		if (than === '<') text += `造成伤害小于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
		if (than === '<=') text += `造成伤害小于等于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
		if (than === '==') text += `造成伤害等于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
		if (than === '!=') text += `造成伤害不等于 <span class="el-text el-text--danger el-text--small">${damage}</span> `;
	}
	if (flag === '00') text += `未产生 直击或暴击 `;
	if (flag === '20') text += `且产生 <span class="el-text el-text--warning el-text--small">暴击</span> `;
	if (flag === '40') text += `且产生 <span class="el-text el-text--warning el-text--small">直击</span> `;
	if (flag === '60') text += `且产生 <span class="el-text el-text--warning el-text--small">直暴</span> `;
	
	text += '时';
	
	return text;
}
