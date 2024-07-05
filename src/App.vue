<template>
	<el-config-provider :locale="zhCn" size="small">
		<div class="container">
			<div class="header">
				<div class="left">
					<el-button-group>
						<template v-if="running">
							<el-button type="primary" @click="restart">重启</el-button>
							<el-button type="primary" @click="stop">停止</el-button>
							<el-button type="primary" @click="test">测试</el-button>
						</template>
						<template v-else>
							<el-button type="primary" @click="start">启动</el-button>
						</template>
					</el-button-group>
				</div>
				<div class="right">
					<el-button-group>
						<el-button type="primary" @click="() => importData()">导入</el-button>
						<el-button type="primary" @click="() => exportData()">导出</el-button>
						<el-button type="primary" @click="() => save()">保存</el-button>
						<el-button type="primary" @click="() => open()">新增</el-button>
					</el-button-group>
				</div>
			</div>
			<div class="body">
				<List ref="refList" />
			</div>
		</div>
	</el-config-provider>
</template>

<script setup lang="tsx">
import {nextTick, ref, shallowRef} from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn"
import List, {Expose} from "@/components/list.vue";
import {Bus} from "@/Bus";
import {parsed15or16} from "@/regexes";

const refList = shallowRef<Expose>();

const running = ref(false);

function start () {
	running.value = true;
	
	save();
	
	const rules = refList.value?.getUseRows();
	bus.start(rules);
}

function restart () {
	stop();
	nextTick(() => {
		start();
	})
}

function stop () {
	running.value = false;
	bus.stop();
}

function save () {
	refList.value?.save();
}

function open () {
	refList.value?.open();
}

function importData () {
	refList.value?.importData();
}

function exportData () {
	refList.value?.exportData();
}

function test () {
	bus.handle('[23:43:04.034] ActionEffect 15:104FFD4F:友人A:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1', parsed15or16);
}

const bus = new Bus();
</script>

<style lang="less" scoped>
.container {
	pointer-events: initial;

	width: 100%;
	height: 100%;
	
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 40px 1fr;
	
	.header {
		box-shadow: 0 -1px 1px -1px #333333 inset;
		display: grid;
		grid-template-columns: repeat(2, auto);
		justify-content: space-between;
		align-content: center;
		padding: 0 12px;
		box-sizing: border-box;
		
		background: rgba(0, 0, 0, .6);
	}
}
</style>
