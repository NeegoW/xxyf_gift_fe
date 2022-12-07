import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App'
import router from './router'

createApp(App).use(ElementPlus).use(router).mount('#app')
