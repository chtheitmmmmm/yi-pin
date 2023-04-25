import { createRouter, createWebHistory } from 'vue-router';
import {routes} from "@/entities/pages";

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router