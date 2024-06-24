import { createApp } from 'vue'

import './libs/ngld'

import 'normalize.css'
import './style.less'

import ElementPlus from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn"
import 'element-plus/es/components/text/style/css'

import App from './App.vue'

createApp(App)
	.use(ElementPlus, {
		size: "small",
		locale: zhCn,
	})
	.mount('#app');
