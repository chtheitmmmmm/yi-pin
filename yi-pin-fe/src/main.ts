import {createApp, type InjectionKey} from 'vue'
import axios from 'axios';
import router from '@/router/router';
import 'bootstrap/dist/js/bootstrap.min.js'
import App from '@/App.vue';
import { marked } from "marked";
// @ts-ignore
import { mangle } from "marked-mangle"
// @ts-ignore
import { gfmHeadingId } from "marked-gfm-heading-id";
import ElementPlus from 'element-plus'
import { createPinia } from "pinia";
import '@/assets/app.scss'

marked.use(mangle())
marked.use(gfmHeadingId({
	prefix: "markdown-forum-",
}));

axios.defaults.baseURL = `${location.origin}/api`

const pinia = createPinia();

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)

app.mount("#app")

