export default {
  path: '/rooms',
  name: 'rooms',
  component: () => import(/* webpackChunkName: "auth" */'@/pages/rooms'),
  meta: {
    auth: true,
  },
};
