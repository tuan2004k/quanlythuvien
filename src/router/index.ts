import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomePage.vue';
import ResetPass from '@/components/ResetPass.vue';
import QuanLySach from '@/components/QuanLySach.vue';
import Themxoa from '@/components/Themxoa.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/Resetpass',
      name: 'Resetpass',
      component: () => import('../components/Resetpass.vue'),
    },
    {
      path: '/Quanlysach',
      name: 'QuanLySach',
      component: () => import('../components/QuanLySach.vue'),
    },
    {
      path: '/Themxoa',
      name: 'Themxoa',
      component: () => import('../components/Themxoa.vue'),
    },
    
  
  ],
});

export default router;
