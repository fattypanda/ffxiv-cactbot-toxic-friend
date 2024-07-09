import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import {fileURLToPath} from "node:url";
import {dirname, resolve} from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
	  vueJsx(),
	  AutoImport({
		  resolvers: [ElementPlusResolver()],
	  }),
	  Components({
		  resolvers: [ElementPlusResolver()],
	  }),
  ],
	base: './',
	resolve: {
		alias: {
			'@':  fileURLToPath(new URL("src", import.meta.url)),
		}
	},
	build: {
		minify: false,
		rollupOptions: {
			input: {
				index: resolve(__dirname, './index.html'),
				main: resolve(__dirname, './main.html'),
				setting: resolve(__dirname, './setting.html'),
			}
		}
	}
})
