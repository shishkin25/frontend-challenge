import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import catReducer from '@/store/catSlice';

const store = configureStore({
  reducer: {
    cats: catReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
