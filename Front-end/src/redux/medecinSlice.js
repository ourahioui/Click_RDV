// src/redux/medecinSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
};

const medecinSlice = createSlice({
  name: 'medecin',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = null;
    }
  },
});

export const { setFormData, clearFormData } = medecinSlice.actions;
export default medecinSlice.reducer;
