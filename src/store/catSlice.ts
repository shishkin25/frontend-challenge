import { createSlice } from '@reduxjs/toolkit';
import { Cat } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCats } from './catsThunks';

interface CatState {
  cats: Cat[];
  isLoading: boolean;
  error: string;
}

const initialState: CatState = {
  cats: [],
  isLoading: false,
  error: '',
};

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.isLoading = true;
        state.cats = [];
        state.error = '';
      })
      .addCase(fetchCats.fulfilled, (state, action: PayloadAction<Cat[]>) => {
        state.isLoading = false;
        state.cats = action.payload;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.message
          : 'Неизвестная ошибка';
        state.cats = [];
      });
  },
});

export default catSlice.reducer;
