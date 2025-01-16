import { createSlice } from '@reduxjs/toolkit';
import { Cat, CatsData } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCats } from './catsThunks';

interface CatState {
  cats: Cat[];
  onlyFavoriteCats: Cat[];
  isLoading: boolean;
  error: string;
  allCatsCount: string | null;
}

const initialState: CatState = {
  cats: [],
  onlyFavoriteCats: [],
  isLoading: false,
  error: '',
  allCatsCount: '0',
};

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    toggleIsFavorite: (state, action: PayloadAction<Cat['id']>) => {
      const choosedCat = state.cats.find((cat) => cat.id === action.payload);

      if (choosedCat) {
        choosedCat.isFavorite = !choosedCat.isFavorite;
      }
    },

    changeOnlyFavoriteArray: (state, action: PayloadAction<Cat['id']>) => {
      const choosedCat = state.cats.find((cat) => cat.id === action.payload);
      if (choosedCat) {
        const IsChoosedCatInOnlyFavoriteCats = state.onlyFavoriteCats.find(
          (cat) => cat.id === choosedCat.id
        );
        if (IsChoosedCatInOnlyFavoriteCats) {
          const storedCats = localStorage.getItem('onlyFavoriteCats');
          if (storedCats) {
            localStorage.setItem(
              'onlyFavoriteCats',
              JSON.stringify(
                state.onlyFavoriteCats.filter((cat) => cat.id !== choosedCat.id)
              )
            );
          }

          return {
            ...state,
            onlyFavoriteCats: state.onlyFavoriteCats.filter(
              (cat) => cat.id !== choosedCat.id
            ),
          };
        } else {
          state.onlyFavoriteCats.push(choosedCat);
        }
      } else {
        const IsChoosedCatInOnlyFavoriteCats = state.onlyFavoriteCats.find(
          (cat) => cat.id === action.payload
        );

        if (IsChoosedCatInOnlyFavoriteCats) {
          return {
            ...state,
            onlyFavoriteCats: state.onlyFavoriteCats.filter(
              (cat) => cat.id !== action.payload
            ),
          };
        }
      }
    },

    setOnlyFavoriteCats: (state, action: PayloadAction<Cat[]>) => {
      state.onlyFavoriteCats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchCats.fulfilled,
        (state, action: PayloadAction<CatsData>) => {
          state.isLoading = false;
          state.cats = [...state.cats, ...action.payload.cats];
          state.allCatsCount = action.payload.allCatsCount;
        }
      )
      .addCase(fetchCats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.message
          : 'Неизвестная ошибка';
        state.cats = [];
      });
  },
});

export const {
  toggleIsFavorite,
  changeOnlyFavoriteArray,
  setOnlyFavoriteCats,
} = catSlice.actions;
export default catSlice.reducer;
