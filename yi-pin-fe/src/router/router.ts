import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/main/MainPage.vue';
import ProfilePage from '@/components/main/ProfilePage.vue';
import type { User } from '@/entities/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: "/",
    name: "main",
    component: MainPage
  }, {
    path: "/profile",
    name: 'profile',
    component: ProfilePage,
    props: ['userData']
  }]
})

export default router