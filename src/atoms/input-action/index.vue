<template>
	<el-autocomplete
		v-model="value"
		:fetch-suggestions="fetchSuggestions"
		:trigger-on-focus="false"
	>
		<template #default="{item}">
			<div class="option">
				<div class="option--value">{{item.label}}</div>
				<div class="option--description">{{item.description}}</div>
			</div>
		</template>
	</el-autocomplete>
</template>

<script lang="ts" setup>

import {computed} from "vue";

const props = defineProps<{
	modelValue?: string;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', v?: string): any;
	(e: 'change', v?: string): any;
}>();

const value = computed({
	get () {
		return props.modelValue;
	},
	set (v) {
		emits('update:modelValue', v);
		emits('change', v);
	}
});

function fetchSuggestions (query: string, cb: (arg: any) => void) {
	const last = query[query.length - 1];
	if (last === '$') {
		cb([
			{value: `${query}{damage}`, label: '${damage}', description: '伤害值'},
			{value: `${query}{skill}`, label: '${skill}', description: '技能名'},
			{value: `${query}{player}`, label: '${player}', description: '玩家名'},
		]);
	} else if (last === '/') {
		cb([
			{value: `${query}e `, label: '/e', description: '默语'},
			{value: `${query}p `, label: '/p', description: '小队'},
		]);
	} else {
		cb([]);
	}
}
</script>

<script lang="ts">
export default {
	name: 'a-input-action',
}
</script>

<style lang="less" scoped>
.option {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 16px;
	align-content: baseline;
	
	.option--value {
		color: var(--el-text-color-primary);
		font-size: 14px;
	}
	
	.option--description {
		color: var(--el-text-color-regular);
		font-size: 12px;
	}
}
</style>
