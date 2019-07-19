import { api } from '@/api';
import * as types from './mutation-types';

export const check = ({ commit, dispatch }) => {
  if (localStorage.getItem('auth') === 'true') {
    commit(types.LOGIN);
  }
  dispatch('account/find', null, { root: true });
};

export const login = async ({ commit, dispatch }, { username, password }) => {
  commit(types.CLEAR);
  try {
    const result = await api('http://localhost:3000/api/auth/login', {
      username,
      password,
    });
    console.log(result)

    if (result.token) {
      localStorage.setItem('auth', true);
      localStorage.setItem('token', result.token);
      dispatch('account/find', null, { root: true });
      commit(types.LOGIN);
    } else if (result.error) {
      commit(types.FAILED, result.error);
    }
  } catch (e) {
    localStorage.setItem('auth', true);
    commit(types.FAILED, e.message);
  }
};

export const signin = async ({ commit, dispatch }, { username, password }) => {
  commit(types.CLEAR);
  try {
    const result = await api('http://localhost:3000/api/auth/register', {
      username,
      password,
    });

    console.log(username, password)

    if (result.token) {
      localStorage.setItem('auth', true);
      localStorage.setItem('token', result.token);
      dispatch('account/find', null, { root: true });
      commit(types.LOGIN);
    } else if (result.error) {
      commit(types.FAILED, result.error);
    }

  } catch (e) {
    console.error(e);
  }
};

export default {
  check,
  login,
  signin,
};
