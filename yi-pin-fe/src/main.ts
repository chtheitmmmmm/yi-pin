import { createApp } from 'vue'
import 'bootstrap/scss/bootstrap.scss'
import '@/assets/app.scss'
import axios from 'axios';
import router from '@/router/router';
import App from '@/App.vue';


axios.defaults.baseURL = `${location.origin}/api`

const app = createApp(App)
app.use(router)
app.mount("#app")

