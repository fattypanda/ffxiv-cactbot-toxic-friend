import { createApp } from 'vue'

import './libs/ngld'

import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css';
import './style.less'

// import ElementPlus from 'element-plus'
import 'element-plus/es/components/text/style/css'

import App from './App.vue'

createApp(App)
	// .use(ElementPlus, {
	// 	size: "small",
	// 	locale: zhCn,
	// })
	.mount('#app');
