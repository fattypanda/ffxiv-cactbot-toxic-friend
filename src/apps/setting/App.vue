<template>
	<el-global-config>
		<el-space style="width: 100%; justify-content: space-between;">
			<el-button-group style="padding: 4px 4px;">
				<el-button type="primary" text @click="() => importData()">导入</el-button>
				<el-button type="primary" text @click="() => exportData()">导出</el-button>
				<el-button type="primary" text @click="() => save()">保存</el-button>
			</el-button-group>
			<el-button-group style="padding: 4px 4px;">
				<el-button type="primary" text @click="() => open()">新增</el-button>
			</el-button-group>
		</el-space>
		
		<el-table ref="refTable" :data="rules" border>
			<el-table-column width="30" align="center" fixed="left">
				<template #header>
					<el-checkbox :model-value="all" :indeterminate="all? false: indeterminate" @change="changeAll" />
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
			<el-table-column label="操作" width="105" align="center" fixed="right">
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
	</el-global-config>
</template>

<script setup lang="tsx">
import {nextTick, ref, shallowRef, unref, onMounted} from "vue";
import {ElMessage, TableInstance} from "element-plus";
import AInputAction from "@/atoms/input-action";
import options from '@/dict';
import {rowToRule} from "@/hooks";
import {IRow} from "@/type";
import {download} from "@/utils";

import {showOpenFilePicker} from "file-system-access";
import ElGlobalConfig from "@/components/el-global-config.vue";
import useRules, {useRulesSelect, actions, storage} from "@/hooks/useRules";

const {
	rules,
} = useRules();

const {
	all,
	indeterminate,
	changeAll,
} = useRulesSelect(rules);

const defaults = {
	form (cid = false) {
		return actions.createRule({}, cid);
	}
}

const refTable = shallowRef<TableInstance>();

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
	rules.value = rules.value.filter(v => v.id !== row.id);
}

function close () {
	visible.value = false;
	form.value = {};
}

function submit () {
	const rows = unref(rules);
	const data = unref(form) as IRow;
	
	if (form.value.id) {
		const i = rows.findIndex(v => v.id === form.value.id);
		if (i > -1) rows[i] = Object.assign({}, data);
	} else {
		form.value.id = actions.createId();
		rows.push(Object.assign({}, data));
	}
	
	rules.value = rows;
	
	nextTick(() => {
		visible.value = false;
		form.value = {};
	});
}

function getData () {
	return actions.stringify(rules.value);
}

function setData (_data: Partial<IRow>[]) {
	rules.value = actions.parse(_data);
}

function save () {
	storage.set(actions.stringify(rules.value));
	window.opener?.postMessage('resetting', '*');
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
	rules.value = [
		defaults.form(true),
		actions.createRule({
			use: true,
			skill: '攻击',
			flag: '60',
			damage: '0',
			than: '>',
			echo: '/p $\{player} 居然浪费了宝贵的直暴在普通攻击上！而且仅仅造成了 $\{damage} 点伤害。'
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
</script>

<style lang="less" scoped>

</style>
