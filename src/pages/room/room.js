import VLayoutApp from '@/layouts/Default';
import CMessage from '@/components/Message';
import { mapState } from 'vuex';
import { api } from '@/api';

export default {
  name: 'room',
  components: {
    VLayoutApp,
    CMessage,
  },
  sockets: {
    newActive() {
      this.getActives();
    },
    newFollowers() {},
    newMessage() {
      this.newMessage();
    },
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line no-underscore-dangle
      id: ({ account }) => account._id,
      name: ({ account }) => account.username,
    }),
  },
  data() {
    return {
      room: null,
      active: [],
      followers: [],
      messages: [],
      text: '',
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
    async getMessages() {
      try {
        const result = await api(`http://localhost:3000/api/message/all/${this.$route.params.id}`);
        if (result.success) {
          this.messages = result.messages;
          this.$nextTick(() => {
            this.fixBottom(this.$refs.containerMessage);
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async newMessage() {
      try {
        const result = await api(`http://localhost:3000/api/message/all/${this.$route.params.id}`);
        if (result.success) {
          this.messages = result.messages;
          this.$nextTick(() => {
            console.log((this.$refs.containerMessage).clientHeight, (this.$refs.containerMessage).scrollTop, (this.$refs.containerMessage).scrollHeight);
            const lastItem = (this.$refs.containerMessage).lastElementChild;
            if (((this.$refs.containerMessage).clientHeight + (this.$refs.containerMessage).scrollTop + lastItem.offsetHeight) === (this.$refs.containerMessage).scrollHeight) {
              this.fixBottom(this.$refs.containerMessage);
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async send() {
      try {
        await api('http://localhost:3000/api/message/add', {
          text: this.text,
          user_id: this.id,
          room_id: this.$route.params.id,
        });
        this.text = '';
      } catch (e) {
        console.error(e);
      }
    },
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
        await api('http://localhost:3000/api/active/add', {
          socket_id: this.$socket.id,
          user_id: this.id,
          room_id: this.$route.params.id,
        });
      } catch (e) {
        console.error(e);
      }
    },
    async deleteActive() {
      try {
        console.log(this.$route, 'before');
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
    fixBottom(target) {
      target.scrollTop = target.scrollHeight;
    },
  },
  async created() {
    this.getRoom();
    this.addActive();
    this.getMessages();
  },
  async beforeDestroy() {
    try {
      await api(`http://localhost:3000/api/active/delete/${this.room._id}`, {
        socket_id: this.$socket.id,
      });
    } catch (e) {
      console.error(e);
    }
    this.room = null;
    this.messages = [];
    this.active = [];
    this.followers = [];
  },
};
