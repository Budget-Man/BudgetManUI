import './assets/main.css'
import "./assets/scss/main.scss"

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
import './Services/Startup.ts'
// @ts-ignore
import { languages } from './languages'
// @ts-ignore
import vue3GoogleLogin from 'vue3-google-login'
import store from './store'; // Import your store

//prime
import PrimeVue from 'primevue/config';
import ConfirmationService  from 'primevue/confirmationservice';
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(Toast)
app.use(languages)
app.use(vue3GoogleLogin,{
    clientId: '807507486424-ios762laefni6l7u7fgnl41a1fifgj4v.apps.googleusercontent.com'
})
app.use(store)
app.use(PrimeVue, {
    zIndex: {
        modal: 3100,        //dialog, drawer
        overlay: 3000,      //select, popover
        menu: 3000,         //overlay menus
        tooltip: 3100       //tooltip
    }
});
app.use(ConfirmationService);
app.mount('#app')
