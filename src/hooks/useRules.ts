import {Ref, onMounted, onUnmounted, ref, computed, toRaw} from "vue";
import {IRow} from "@/type";
import {map, uniqueId, unset} from "lodash-es";

export const storage = {
	get () {
		return JSON.parse(localStorage.getItem('rules') || '[]') as Partial<IRow>[];
	},
	set (v: Partial<IRow>[]) {
		localStorage.setItem('rules',  JSON.stringify(v));
	},
}

export const actions = {
	createId () {
		return uniqueId('id-');
	},
	createRule (row: Partial<IRow>, cid = true) {
		return {
			...(cid? { id: actions.createId()}: {}),
			use: false,
			echo: `/p $\{player} 使用了 $\{skill} ，直暴了 $\{damage} 点伤害。`,
			player: '',
			skill: '',
			damage: '10000',
			flag: '60',
			than: '>',
			...row,
		} as IRow;
	},
	stringify (data: IRow[]) {
		return data.map(v => {
			const row = {...toRaw(v)};
			unset(row, 'id');
			return row as Partial<IRow>;
		});
	},
	parse (data: Partial<IRow>[]) {
		return map(data, row => ({
			use: false,
			echo: '',
			player: '',
			skill: '',
			damage: '1',
			flag: '60',
			than: '>',
			...row,
			id: actions.createId(),
		}) as IRow);
	},
}

export default function useRules () {
	
	const rules = ref<IRow[]>([]);
	
	function handleMessage (e: MessageEvent<'resetting' | any>) {
		if (e.data === 'resetting') {
			rules.value = actions.parse(storage.get());
		}
	}
	
	onMounted(() => {
		window.addEventListener('message', handleMessage);
	});
	
	onUnmounted(() => {
		window.removeEventListener('message', handleMessage);
	});
	
	return {
		rules,
	}
}

export function useRulesSelect (rules: Ref<IRow[]>) {
	
	const all = computed(() => {
		return rules.value.length === 0? false: rules.value.every(({use}) => use);
	});
	
	const indeterminate = computed(() => {
		return rules.value.some(({use}) => use);
	});
	
	function changeAll (v: boolean) {
		if (v) {
			rules.value.map(v => v.use = true);
		} else {
			rules.value.map(v => v.use = false);
		}
	}
	
	return {
		all,
		indeterminate,
		changeAll
	}
}

export function useRulesUse (rules: Ref<IRow[]>) {
	return computed(() => {
		return rules.value.filter(v => v.use).map(v => toRaw(v));
	});
}
