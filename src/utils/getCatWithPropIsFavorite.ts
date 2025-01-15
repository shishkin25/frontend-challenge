import { Cat } from '@/types';

export const getCatWithPropIsFavorite = (cat: Omit<Cat, 'isFavorite'>): Cat => {
  return { ...cat, isFavorite: false };
};
