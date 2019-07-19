export default {
  path: '/register',
  name: 'register',
  component: () => import(/* webpackChunkName: "auth" */'@/pages/register'),
  meta: {
    guest: true,
  },
};
