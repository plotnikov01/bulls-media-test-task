import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserData, login, patchUserData, register } from '../../api/auth.js';

export const fetchRegister = createAsyncThunk('auth/register', async (data) => {
  try {
    await register(data);
  } catch (err) {
    return 'Invalid username or password';
  }
});

export const fetchLogin = createAsyncThunk('auth/login', async (data) => {
  try {
    const response = await login(data);

    const userData = response.data.id;

    return userData;
  } catch (err) {
    return 'Invalid username or password';
  }
});

export const fetchUserData = createAsyncThunk('auth/getUserData', async (id) => {
  try {
    const response = await getUserData(id);

    return response.data;
  } catch (err) {
    return 'Invalid username or password';
  }
});

export const fetchPatchUserData = createAsyncThunk(
  'auth/patchUserData',
  async ({ id, payload }) => {
    try {
      await patchUserData(id, payload);
    } catch (err) {
      return 'Invalid username or password';
    }
  },
);
