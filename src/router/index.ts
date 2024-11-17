import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/DocGia.vue';
import ResetPass from '@/components/ResetPass.vue';
import QuanLySach from '@/components/QuanLySach.vue';
import TraCuuSach from '@/components/TraCuuSach.vue';
import ThuThu from '@/views/Admin.vue';
import HomePage from '../views/DocGia.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [ // Đây là các trang con
        { path: '', component: HomeView },
        { path: 'tra-cuu-tim-kiem', component: TraCuuSach }, // Trang con: Tra cứu sách
        { path: 'quanlysach', component: QuanLySach }, // Trang con: Quản lý sách
      ],
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
      path: '/docgia',
      name: 'docgia',
      component: () => import('../views/DocGia.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
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
    
  
  ],
});

export default router;
