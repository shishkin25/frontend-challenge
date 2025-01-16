import { Params } from '@/types';
import { API_CONFIG } from './apiConfig';

export const fetchCatsData = async (
  limit: Params['limit'],
  page: Params['page']
) => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}?api_key=${API_CONFIG.apiKey}&limit=${limit}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Не удалось получить котиков:(');
  }

  return response;
};
