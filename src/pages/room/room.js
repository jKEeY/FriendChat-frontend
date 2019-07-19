import VLayoutApp from '@/layouts/Default';
import { mapState } from 'vuex';
import { api } from '@/api';

export default {
  name: 'room',
  components: {
    VLayoutApp,
  },
  sockets: {
    newActive() {
      console.log('hello')
      this.getActives();
    },
    newFollowers() {},
    newMessage() {},
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line no-underscore-dangle
      id: ({ account }) => account._id,
    }),
  },
  data() {
    return {
      room: null,
      active: [],
      followers: [],
      messages: [],
    };
  },
  methods: {
    async getRoom() {
      try {
        const result = await api(`http://localhost:3000/api/rooms/${this.$route.params.id}`, {
          socket: this.$socket.id,
        });
        if (result.success) {
          this.room = result.room;
        }
      } catch (e) {
        console.error(e);
      }
    },
    getMessages() {},
    async getActives() {
      try {
        const result = await api(`http://localhost:3000/api/active/all/${this.$route.params.id}`);
        if (result.success) {
          this.active = result.active;
        }
      } catch (e) {
        console.error(e);
      }
    },
    getFollowers() {},
    async addActive() {
      try {
        const result = await api('http://localhost:3000/api/active/add', {
          socket_id: this.$socket.id,
          user_id: this.id,
          room_id: this.$route.params.id,
        });
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteActive() {
      try {
        console.log(this.$route, 'before')
        await api(`http://localhost:3000/api/active/delete/${this.$route.params.id}`, {
          socket_id: this.$socket.id,
        });
      } catch (e) {
        console.error(e);
      }
    },
    leaveChat() {
      this.$router.push({ name: 'rooms' });
    },
  },
  async created() {
    this.getRoom();
    this.addActive();
  },
  beforeDestroy() {
    this.room = null;
    this.messages = [];
    this.active = [];
    this.followers = [];
  },
};
