import VLayoutApp from '@/layouts/Empty';

export default {
  name: 'register',
  components: {
    VLayoutApp,
  },
  data: () => ({
    valid: true,
    show: false,
    name: '',
    nameRules: [
      v => !!v || 'Имя является обязательным',
      v => (v && v.length <= 16) || 'Имя пользователя не должно превышать 16 символам',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Пароль обязателен',
      v => /(?=.*[A-Z])/.test(v) || 'Пароль должен содержать хотя бы один символ верхнего регистра',
    ],
    passwordTwo: '',
    passwordTwoRules: [
      v => !!v || 'Это поле обязательно',
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.dispatch('auth/signin', {
          username: this.name,
          password: this.password,
        }, null, { root: true });
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
