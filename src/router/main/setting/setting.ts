export default {
  name: 'setting',
  path: '/main/setting',
  component: () => import(/* webpackChunkName: "about" */ '@/views/main/setting.vue'),
};
