import { api } from '@/api';

export default {
  path: '/room/:id',
  name: 'room',
  component: () => import(/* webpackChunkName: "auth" */'@/pages/room'),
  meta: {
    auth: true,
  },
};
