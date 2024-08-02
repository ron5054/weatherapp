import { createApp } from 'vue'
import router from './router' // Make sure the path to the router file is correct
import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
