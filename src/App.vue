<template>
	<div class="container">
		<div class="header">
			<div class="left">
				<el-button-group>
					<template v-if="running">
						<el-button type="primary" @click="restart">重启</el-button>
						<el-button type="primary" @click="stop">停止</el-button>
					</template>
					<template v-else>
						<el-button type="primary" @click="start">启动</el-button>
					</template>
				</el-button-group>
				<el-button type="primary" @click="test">测试</el-button>
			</div>
			<div class="right">
				<el-button type="primary" @click="() => open()">新增</el-button>
			</div>
		</div>
		<div class="body">
			<List ref="refList" />
		</div>
	</div>
</template>

<script setup lang="tsx">
import {nextTick, onMounted, ref, shallowRef} from "vue";
import List, {Expose} from "@/components/list.vue";
import {Bus} from "@/Bus";

const refList = shallowRef<Expose>();

const running = ref(false);

addOverlayListener('LogLine', (data) => {
	const {rawLine} = data;
});

function start () {
	running.value = true;
	
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

function open () {
	refList.value?.open();
}

function test () {
	bus.handle('[23:43:04.034] ActionEffect 15:104FFD4F:L斯卡哈:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1');
}

const bus = new Bus();

onMounted(() => {
	
	let log = '';
	
	// 直暴
	log = '[23:43:04.034] ActionEffect 15:104FFD4F:L斯卡哈:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1';
	
	// // 直
	// log = '[23:42:40.526] ActionEffect 15:104FFD4F:L斯卡哈:38:崩拳:40008F1A:欧米茄:13732003:46C10000:F:6B8000:1B:388000:0:0:0:0:0:0:0:0:0:0:2164350:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::107.81:108.45:0.00:-2.49:000082D1:0:1';
	
	// // 暴
	// log = '[23:45:43.047] ActionEffect 15:104FFD4F:L斯卡哈:38:崩拳:40009058:欧米茄:13734003:370E0000:F:6B8000:1B:388000:0:0:0:0:0:0:0:0:0:0:108171:4314620:10000:10000:::99.99:89.98:0.00:0.00:75543:75543:10000:10000:::102.77:87.94:0.00:-0.94:0000886D:0:1';
	
	// // 无直暴
	// log = '[23:42:58.104] ActionEffect 15:104FFD4F:L斯卡哈:38:崩拳:40008F1A:欧米茄:00730003:1C3C0000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:1113782:8557964:10000:10000:::100.11:99.96:0.00:-3.12:52610:75543:10000:10000:::103.29:112.41:0.00:-2.89:000083BA:0:1';
	
	bus.handle(log);
});
</script>

<style lang="less" scoped>
.container {
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
	}
}
</style>
