export default {
  name: 'Message',
  props: {
    author: {
      type: Object,
    },
    owner: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    createAt: {
      type: String,
    },
  },
};
