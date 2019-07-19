import { router } from '@/plugins/vue-router';
import { api } from '@/api';
import * as types from './mutation-types';

export const find = async ({ commit }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.setItem('auth', false);
    localStorage.removeItem('token');
    if (router.currentRoute.meta.auth) {
      commit('auth/CLEAR', null, { root: true });
      router.push({ name: 'login', query: { redirect: router.currentRoute.path } });
    }
  } else {
    const result = await api('http://localhost:3000/api/auth/check', {
      token,
    });
    console.log(result)
    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('auth', true);
      commit(types.FIND, result.user);
      commit('auth/LOGIN', null, { root: true });
      router.push({ name: 'rooms' });
    } else {
      commit('auth/CLEAR', null, { root: true });
      localStorage.setItem('auth', false);
      localStorage.removeItem('token');
      router.push({ name: 'login' });
    }
  }
};

export default {
  find,
};
