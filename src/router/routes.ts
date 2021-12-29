import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'Order', path: '/view/:id', component: () => import('pages/Order.vue') },
      { name: 'NewOrder', path: '/new', component: () => import('pages/NewOrder.vue') },
      { name: 'Reference', path: '/reference', component: () => import('pages/Reference.vue') },
      { name: 'Doors', path: '/reference/door', component: () => import('pages/Door/Doors.vue') },
      { name: 'DoorEdit', path: '/reference/door/:id/edit', component: () => import('pages/Door/DoorEdit.vue') },
      { name: 'DoorNew', path: '/reference/door/new', component: () => import('pages/Door/DoorNew.vue') },
      { name: 'Additionally', path: '/reference/additionally', component: () => import('pages/Adds/Additionally.vue') },
      { name: 'AdditionallyEdit', path: '/reference/additionally/:id/edit', component: () => import('pages/Adds/AdditionallyEdit.vue') },
      { name: 'AdditionallyNew', path: '/reference/additionally/new', component: () => import('pages/Adds/AdditionallyNew.vue') },
    ],
  },
  {
    path: '/auth',
    name: 'Login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/Auth/Auth.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
