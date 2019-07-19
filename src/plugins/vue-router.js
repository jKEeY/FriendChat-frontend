import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/routes';
import store from '@/store';

Vue.use(Router);

export const router = new Router({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(el => el.meta.auth) && !store.state.auth.auth) {
    next({
      name: 'login',
      query: {
        redirect: to.name,
      },
    });
  } else if (to.matched.some(el => el.meta.guest) && store.state.auth.auth) {
    next({ name: 'rooms' });
  } else {
    next();
  }
});

Vue.router = router;

export default router;
