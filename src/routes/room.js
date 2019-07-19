import { api } from '@/api';

export default {
  path: '/room/:id',
  name: 'room',
  component: () => import(/* webpackChunkName: "auth" */'@/pages/room'),
  meta: {
    auth: true,
  },
  async beforeRouteLeave() {
    try {
      console.log('hello1')
      await api(`http://localhost:3000/api/active/delete/${this.$route.params.id}`, {
        socket_id: this.$socket.id,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
