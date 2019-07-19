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
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
        description: this.description,
      });
      this.name = '';
      this.description = '';
      this.isOpen = false;
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
