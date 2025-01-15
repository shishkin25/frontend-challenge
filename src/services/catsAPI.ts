import { Cat } from '@/types';
import { API_CONFIG } from './apiConfig';

export const fetchCatsData = async (limit: number = 15) => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}?api_key=${API_CONFIG.apiKey}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Не удалось получить котиков:(');
  }

  const data: Omit<Cat, 'isFavorite'>[] = await response.json();

  return data;
};
