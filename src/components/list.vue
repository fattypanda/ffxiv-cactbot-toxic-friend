<template>
	<el-table ref="refTable" :data="data" border>
		<el-table-column width="50" align="center" fixed="left">
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
		<el-table-column label="操作" width="190" align="center" fixed="right">
			<template #default="{row}">
				<el-button type="primary" @click="() => open(row)">编辑</el-button>
				<el-button type="warning" @click="() => copy(row)">复制</el-button>
				<el-button type="danger" @click="() => del(row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	
	<el-dialog v-model="visible" width="80%" lock-scroll :show-close="false">
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
import {computed, nextTick, ref, shallowRef, unref, toRaw} from "vue";
import {TableInstance} from "element-plus";
import AInputAction from "@/atoms/input-action";
import options from '@/dict';
import {rowToRule} from "@/hooks";
import {IRow} from "@/type";
import {uniqueId} from "lodash-es";

const createId = () => uniqueId('id-');

const defaults = {
	form (cid = false) {
		return {
			...(cid? { id: createId()}: {}),
			use: false,
			echo: `/p $\{player} 使用了 $\{skill} ，直暴了 $\{damage} 点伤害。`,
			player: '',
			skill: '',
			damage: '10000',
			flag: '60',
			than: '>',
		} as IRow;
	}
}

const refTable = shallowRef<TableInstance>();
const data = ref<Partial<IRow>[]>([defaults.form(true)]);

const all = computed(() => {
	return data.value.every(({use}) => use);
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

const expose = {
	open,
	getUseRows,
}

defineExpose(expose);

export type Expose = typeof expose;
</script>

<style lang="less" scoped>

</style>
