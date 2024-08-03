import { createApp } from 'vue'
import router from './router'
import './assets/styles/main.scss'
import App from './App.vue'
import { store } from './store/store.js'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
