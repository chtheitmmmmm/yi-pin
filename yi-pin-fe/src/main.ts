import { createApp } from 'vue'
import '@/assets/app.scss'
import axios from 'axios';
import router from '@/router/router';
import 'bootstrap/dist/js/bootstrap.min.js'
import "tailwindcss/tailwind.css"
import App from '@/App.vue';



axios.defaults.baseURL = `${location.origin}/api`

const app = createApp(App)
app.use(router)
app.mount("#app")

