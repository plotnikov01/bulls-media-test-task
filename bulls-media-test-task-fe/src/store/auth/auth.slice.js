import { createSlice } from '@reduxjs/toolkit';

import { fetchLogin, fetchPatchUserData, fetchRegister, fetchUserData } from './auth.actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.userData = null;
      state.error = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchPatchUserData.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchPatchUserData.fulfilled, (state) => {
      state.userData = null;
      state.error = null;
    });
    builder.addCase(fetchPatchUserData.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
