<template>
	<el-config-provider :locale="zhCn" size="small">
		<slot></slot>
	</el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
