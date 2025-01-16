import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cat, CatsData, FetchError, Params } from '@/types';
import { fetchCatsData } from '@/services/catsAPI';
import { getCatWithPropIsFavorite } from '@/utils/getCatWithPropIsFavorite';

export const fetchCats = createAsyncThunk<
  CatsData,
  Params,
  {
    rejectValue: FetchError;
  }
>('cats/fetchCats', async ({ limit, page }, { rejectWithValue }) => {
  try {
    const response = await fetchCatsData(limit, page);
    const catsFromResponse: Omit<Cat, 'isFavorite'>[] = await response.json();

    return {
      cats: catsFromResponse.map((cat) => getCatWithPropIsFavorite(cat)),
      allCatsCount: response.headers.get('Pagination-count'),
    };
  } catch (error) {
    return rejectWithValue({
      message: 'Ошибка при загрузке котиков:( Попробуйте позднее.',
    });
  }
});
