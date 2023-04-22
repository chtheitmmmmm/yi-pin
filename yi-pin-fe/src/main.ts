import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/scss/bootstrap.scss'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:32/api"

createApp(App).mount('#app')
