<template>
	<el-table ref="refTable" :data="data" border>
		<el-table-column width="30" align="center" fixed="left">
			<template #header>
				<el-checkbox :model-value="all" :indeterminate="all? false: indeterminate" @change="handleAll" />
			</template>
			<template #default="{row}">
				<el-checkbox v-model="row.use" />
			</template>
		</el-table-column>
		<el-table-column label="规则" min-width="300" align="center">
			<template #default="{row}">
				<div v-html="rowToRule(row)" />
			</template>
		</el-table-column>
		<el-table-column label="行为" prop="echo" min-width="300" align="center" />
		<el-table-column label="操作" width="160" align="center" fixed="right">
			<template #default="{row}">
				<el-button type="primary" text @click="() => open(row)">编辑</el-button>
				<el-button type="warning" text @click="() => copy(row)">复制</el-button>
				<el-button type="danger" text @click="() => del(row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	
	<el-dialog v-model="visible" width="80%" :show-close="false" align-center>
		<el-form :model="form">
			<el-form-item label="伤害">
				<div style="width: 100%; display: grid; grid-template-columns: 100px 1fr; grid-gap: 16px;">
					<el-select v-model="form.than" placeholder="" style="width: 100px;">
						<el-option v-for="v of options.than" :value="v.value" :label="v.label" />
					</el-select>
					<el-input v-model="form.damage" :formatter="str => str.replace(/\D/g, '')" />
				</div>
			</el-form-item>
			<el-form-item label="直暴">
				<el-select v-model="form.flag" placeholder="">
					<el-option v-for="v of options.flag" :value="v.value" :label="v.label" />
				</el-select>
			</el-form-item>
			<el-form-item label="玩家">
				<el-input v-model="form.player" clearable />
			</el-form-item>
			<el-form-item label="技能">
				<el-input v-model="form.skill" clearable />
			</el-form-item>
			<el-form-item label="规则">
				<div v-html="rowToRule(form)" />
			</el-form-item>
			<el-form-item label="提示">
				<a-input-action v-model="form.echo" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="close">取消</el-button>
			<el-button type="primary" @click="submit">确认</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="tsx">
import {computed, nextTick, ref, shallowRef, unref, toRaw, onMounted} from "vue";
import {ElMessage, TableInstance} from "element-plus";
import AInputAction from "@/atoms/input-action";
import options from '@/dict';
import {rowToRule} from "@/hooks";
import {IRow} from "@/type";
import {download} from "@/utils";

import {uniqueId, unset, map} from "lodash-es";
import {showOpenFilePicker} from "file-system-access";

const createId = () => uniqueId('id-');

const createForm = (row: Partial<IRow>, cid = true) => ({
	...(cid? { id: createId()}: {}),
	use: false,
	echo: `/p $\{player} 使用了 $\{skill} ，直暴了 $\{damage} 点伤害。<se.1>`,
	player: '',
	skill: '',
	damage: '100000',
	flag: '60',
	than: '>',
	...row,
} as IRow);

const defaults = {
	form (cid = false) {
		return createForm({}, cid);
	}
}

const refTable = shallowRef<TableInstance>();
const data = ref<Partial<IRow>[]>([]);

const all = computed(() => {
	return data.value.length === 0? false: data.value.every(({use}) => use);
});
const indeterminate = computed(() => {
	return data.value.some(({use}) => use);
});
function handleAll (v: boolean) {
	if (v) {
		data.value.map(v => v.use = true);
	} else {
		data.value.map(v => v.use = false);
	}
}

const visible = ref(false);
const form = ref<Partial<IRow>>({});

function open (row?: IRow) {
	visible.value = true;
	form.value = Object.assign({}, defaults.form(), row? unref(row): {});
}

function copy (row: IRow) {
	visible.value = true;
	form.value = Object.assign({}, row? unref(row): {}, {id: void 0});
}

function del (row: IRow) {
	data.value = data.value.filter(v => v.id !== row.id);
}

function close () {
	visible.value = false;
	form.value = {};
}

function submit () {
	const rows = unref(data);
	
	if (form.value.id) {
		const i = rows.findIndex(v => v.id === form.value.id);
		if (i > -1) rows[i] = Object.assign({}, unref(form));
	} else {
		form.value.id = createId();
		rows.push(Object.assign({}, unref(form)));
	}
	
	data.value = rows;
	
	nextTick(() => {
		visible.value = false;
		form.value = {};
	});
}

function getUseRows () {
	return data.value.filter(v => v.use).map(v => toRaw(v));
}

function getData () {
	return data.value.map(v => {
		const row = {...toRaw(v)};
		unset(row, 'id');
		return row;
	});
}

function setData (_data: Partial<IRow>[]) {
	data.value = map(_data, row => ({
		...row,
		id: createId(),
	}));
}

function save () {
	localStorage.setItem('rules',  JSON.stringify(getData()));
}

function importData () {
	try {
		showOpenFilePicker({
			types: [{accept: {'application/json': ['.json']}}],
			excludeAcceptAllOption: true,
			multiple: false,
		} as any).then(async ([handle]) => {
			const file = await handle.getFile();
			const content = await file.text();
			const last = JSON.parse(content);
			setData(last);
		});
	} catch (err) {
		ElMessage.error({message: (err as Error).message});
	}
}

function exportData () {
	save();
	download(getData(), 'rule.json');
}

function useDefaultData () {
	data.value = [
		defaults.form(true),
		createForm({
			use: true,
			skill: '攻击',
			flag: '60',
			damage: '0',
			than: '>',
			echo: '/p $\{player} 居然浪费了宝贵的直暴在普通攻击上！而且仅仅造成了 $\{damage} 点伤害。<se.11>'
		}, true),
		createForm({
			use: true,
			skill: '',
			flag: '60',
			damage: '5000',
			than: '<',
			echo: `/p $\{player} 的 $\{skill} 直暴了 $\{damage} 点伤害。`
		}, true)
	];
}

onMounted(() => {
	const last = JSON.parse(localStorage.getItem('rules') || '[]') as IRow[];
	if (last.length > 0) {
		setData(last);
	} else {
		useDefaultData();
	}
});

const expose = {
	save,
	open,
	importData,
	exportData,
	useDefaultData,
	getUseRows,
}

defineExpose(expose);

export type Expose = typeof expose;
</script>

<style lang="less" scoped>

</style>
