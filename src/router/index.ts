import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/DocGia.vue';
import ResetPass from '@/components/ResetPass.vue';
import QuanLySach from '@/components/QuanLySach.vue';
import TraCuuSach from '@/components/TraCuuSach.vue';
import HomePage from '../views/Admin.vue';
import DocGia from '../views/DocGia.vue';
import MuonSach from '@/components/MuonSach.vue';
import QuanLyTaiKhoan from '@/components/QuanLyTaiKhoan.vue';
import Trangchu from '@/components/Trangchu.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: 'tra-cuu-tim-kiem',
          component: TraCuuSach,
        },
        {
          path: 'quanlysach',
          component: QuanLySach,
        },
        {
          path: 'muonsach',
          component: MuonSach,
        },
        {
          path: 'quanlytaikhoan',
          component: QuanLyTaiKhoan,
        },
        {
          path: 'home',
          component: Trangchu,
        },
      ],
    },
    {
      path: '/docgia',
      name: 'docgia',
      component: DocGia, // Giao diện độc giả
      meta: { role: ['docgia'] },
      children: [
        {
          path: 'tra-cuu-tim-kiem',
          component: TraCuuSach,
          meta: { role: ['docgia'] },
        },
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
