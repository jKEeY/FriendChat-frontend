export default {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "auth" */'@/pages/login'),
  meta: {
    guest: true,
  },
};
