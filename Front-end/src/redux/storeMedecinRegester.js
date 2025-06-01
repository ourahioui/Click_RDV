// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import medecinReducer from './medecinSlice';

export const store = configureStore({
  reducer: {
    medecin: medecinReducer,
  },
});
