import { createSelector } from '@reduxjs/toolkit';

const getState = (state) => state.auth;
export const userDataSelector = createSelector(getState, (state) => state.userData);
export const errorSelector = createSelector(getState, (state) => state.error);
