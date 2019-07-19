import { api } from '@/api';
import VLayoutApp from '@/layouts/Default';

export default {
  name: 'rooms',
  data() {
    return {
      rooms: null,
    };
  },
  sockets: {
    newRoom() {
      this.getRooms();
    },
  },
  components: {
    VLayoutApp,
  },
  methods: {
    goRoom(id) {
      this.$router.push({ name: 'room', params: { id } });
    },
    async getRooms() {
      try {
        const result = await api('http://localhost:3000/api/rooms');
        if (result.success) {
          this.rooms = result.rooms;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.getRooms();
  },
};
