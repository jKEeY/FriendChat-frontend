import { mapState } from 'vuex';

import VLayoutApp from '@/layouts/Empty';

export default {
  name: 'auth',
  components: {
    VLayoutApp,
  },
  data: () => ({
    valid: true,
    show: false,
    name: '',
    nameRules: [
      v => !!v || 'Имя является обязательным',
      v => (v && v.length <= 16) || 'Имя пользовател не должно превышать 16 символам',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Пароль обязателен',
    ],
  }),
  computed: {
    ...mapState({
      error: ({ auth }) => auth.error,
    }),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.dispatch('auth/login', {
          username: this.name,
          password: this.password,
        }, { root: true });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
