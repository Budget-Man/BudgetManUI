import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'


//add toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';

// @ts-ignore
import router from './router/index.ts'
// import './styles/dark/css-vars.css'
// @ts-ignore
import startup from './Services/Startup.ts'
const app = createApp(App)


app.use(router)
app.use(ElementPlus)
app.use(Toast)
app.mount('#app')
startup.initialize();