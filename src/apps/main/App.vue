<template>
	<el-global-config>
		<div class="container">
			<div class="header">
				<div class="left">
					<el-button-group>
						<template v-if="running">
							<el-button type="primary" text @click="restart">重启</el-button>
							<el-button type="primary" text @click="stop">停止</el-button>
							<el-button type="primary" text @click="test">测试</el-button>
						</template>
						<template v-else>
							<el-button type="primary" text @click="start">启动</el-button>
						</template>
					</el-button-group>
				</div>
				<div class="right">
					<el-button-group>
						<el-button type="primary" text @click="() => setting()">设置</el-button>
					</el-button-group>
					<el-button type="primary" text @click="() => show = !show">
						{{show? '折叠': '展开'}}
					</el-button>
				</div>
			</div>
			<div class="body">
				<div class="first">
					<div class="row">{{first}}</div>
				</div>
				<transition name="el-zoom-in-top">
					<div v-show="show" class="others">
						<div class="row" v-for="log of others">
							{{log}}
						</div>
					</div>
				</transition>
			</div>
		</div>
	</el-global-config>
</template>

<script lang="ts" setup>
import ElGlobalConfig from "@/components/el-global-config.vue";

import {computed, nextTick, ref, toRaw, watchEffect} from "vue";
import {Bus} from "@/Bus";
import {parsed15or16} from "@/regexes";
import useRules from "@/hooks/useRules";

const {
	rules
} = useRules();

const running = ref(false);
const show = ref(false);
const logs = ref<string[]>([]);

const first = computed(() => {
	return logs.value?.[0] || '';
});

const others = computed(() => {
	return logs.value.slice(1);
});

function start () {
	running.value = true;
	
	const _rules = rules.value.filter(v => v.use).map(v => toRaw(v));
	bus.start(_rules);
}

function stop () {
	running.value = false;
	logs.value = [];
	bus.stop();
}

function restart () {
	stop();
	nextTick(() => {
		start();
	});
}

function setting () {
	const resize = 1;
	window.open(
		'./setting.html',
		'Toxic Friend Setting',
		`width=${1200 * resize},height=${400 * resize}`
	);
}

function test () {
	bus.handle('[23:43:04.034] ActionEffect 15:104FFD4F:友人A:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1', parsed15or16);
}

const bus = new Bus({
	echo (v) {
		logs.value = [v, ...logs.value];
	}
});
</script>

<style lang="less">
.container {
	pointer-events: initial;
	
	width: 100%;
	height: 100%;
	
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 28px 1fr;
	
	--g-padding: 0 12px;
	
	.header {
		box-shadow: 0 -1px 1px -1px #000 inset;
		display: grid;
		grid-template-columns: repeat(2, auto);
		justify-content: space-between;
		align-content: center;
		padding: var(--g-padding);
		box-sizing: border-box;
		
		background: rgba(0, 0, 0, .6);
	}
	
	.body {
		
		--row-height: 24px;
		--row-padding: var(--g-padding);
		
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: var(--row-height) 1fr;
		
		.first {
			.row {
				background: rgba(0, 0, 0, .65);
			}
		}
		
		.others {
			.row {
				background: rgba(0, 0, 0, .6);
			}
		}
		
		.row {
			width: 100%;
			height: var(--row-height);
			
			padding: var(--row-padding);
			box-sizing: border-box;
			box-shadow: 0 -1px 1px -1px #000 inset;
			
			font-size: 12px;
			
			display: inline-grid;
			align-items: center;
			
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
