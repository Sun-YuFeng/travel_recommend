import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/es/toast/style'
import './styles/common.css'
import './styles/global.css'

createApp(App).use(router).mount('#app')
