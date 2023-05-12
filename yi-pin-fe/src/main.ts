import { createApp } from 'vue'
import '@/assets/app.scss'
import axios from 'axios';
import router from '@/router/router';
import 'bootstrap/dist/js/bootstrap.min.js'
import "tailwindcss/tailwind.css"
import App from '@/App.vue';
import {session} from "@/entities/session";
import { marked } from "marked";
// @ts-ignore
import { mangle } from "marked-mangle"
// @ts-ignore
import { gfmHeadingId } from "marked-gfm-heading-id";
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";

marked.use(mangle())
marked.use(gfmHeadingId({
	prefix: "markdown-forum-",
}));

axios.defaults.baseURL = `${location.origin}/api`

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.provide("session", session)
app.mount("#app")

