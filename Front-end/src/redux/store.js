import { configureStore, createSlice } from '@reduxjs/toolkit';

// Crée un slice (une partie du store) pour stocker les données de recherche
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    ville: '',
    specialite: '',
  },
  reducers: {
    setSearchData: (state, action) => {
      state.ville = action.payload.ville;
      state.specialite = action.payload.specialite;
    },
  },
});

export const { setSearchData } = searchSlice.actions;

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});

export default store;
