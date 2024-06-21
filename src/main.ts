import { createApp } from 'vue'
import {createPinia} from "pinia"
import ElementPlus from 'element-plus'
import 'normalize.css'
import './style.less'
import App from './App.vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";

import 'element-plus/es/components/text/style/css';

createApp(App)
	.use(createPinia())
	.use(ElementPlus, {
		size: "small",
		locale: zhCn,
	})
	.mount('#app');
