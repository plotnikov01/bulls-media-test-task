import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../store/auth/index.js';

export const rootStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
