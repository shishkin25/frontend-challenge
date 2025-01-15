import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cat, FetchError } from '@/types';
import { fetchCatsData } from '@/services/catsAPI';
import { getCatWithPropIsFavorite } from '@/utils/getCatWithPropIsFavorite';

export const fetchCats = createAsyncThunk<
  Cat[],
  void,
  {
    rejectValue: FetchError;
  }
>('cats/fetchCats', async (_, { rejectWithValue }) => {
  try {
    const catsFromResponse = await fetchCatsData();
    return catsFromResponse.map((cat) => getCatWithPropIsFavorite(cat));
  } catch (error) {
    return rejectWithValue({
      message: 'Ошибка при загрузке котиков:( Попробуйте позднее.',
    });
  }
});
