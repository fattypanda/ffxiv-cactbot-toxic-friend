export type IFlag = '00' | '20' | '40' | '60';

export const flag: {label: string; value: IFlag;}[] = [
	{label: '无', value: '00'},
	{label: '暴击', value: '20'},
	{label: '直击', value: '40'},
	{label: '直暴', value: '60'},
];

export type IThan = '' | '>=' | '>' | '<' | '<=' | '==' | '!=';

export const than: {label: string; value: IThan;}[] = [
	{label: '大于等于', value: '>='},
	{label: '大于', value: '>'},
	{label: '小于', value: '<'},
	{label: '小于等于', value: '<='},
	{label: '等于', value: '=='},
	{label: '不等于', value: '!='},
];

export default {
	flag,
	than
}
