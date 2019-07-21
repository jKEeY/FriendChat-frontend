export default {
  name: 'addRoom',
  props: {
    open: {
      type: Boolean,
    },
  },
  data() {
    return {
      isOpen: false,
      name: '',
      description: '',
      items: [2, 5, 10],
      item: null,
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
        description: this.description,
        max_size: this.item,
      });
      this.name = '';
      this.description = '';
      this.isOpen = false;
      this.item = null;
    },
  },
  watch: {
    open(val) {
      this.isOpen = val;
    },
  },
  created() {
    this.isOpen = this.open;
  },
};
