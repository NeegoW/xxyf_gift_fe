import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vant from 'vant'
import 'vant/lib/index.css'
import App from './App'
import router from './router'

createApp(App).use(ElementPlus).use(router).use(vant).mount('#app')
