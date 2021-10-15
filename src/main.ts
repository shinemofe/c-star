import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import { store } from './store'
import './assets/index.postcss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const head = createHead()
const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(head)

app.mount('#app')
