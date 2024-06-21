import {IFlag, IThan} from "@/dict";

export type IRow = {
	id: string;
	use: boolean;
	echo: string;
	player: string;
	skill: string;
	damage: string;
	flag: IFlag;
	than: IThan;
};
