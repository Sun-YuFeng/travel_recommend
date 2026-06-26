import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '../layouts/AppShell.vue'
import HomePage from '../pages/HomePage.vue'
import ChatPage from '../pages/ChatPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppShell,
      children: [
        { path: '', component: HomePage },
        { path: 'chat', component: ChatPage },
        { path: 'profile', component: ProfilePage },
      ],
    },
  ],
})

export default router
