export type NavItemsType = 'Все котики' | 'Любимые котики';

export interface Cat {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
  isFavorite: boolean;
  categories?: { id: number; name: string }[];
}

export interface CatsData {
  cats: Cat[];
  allCatsCount: string | null;
}

export type ApiConfig = {
  baseUrl: string;
  apiKey: string;
};

export interface FetchError {
  message: string;
  code?: number;
  details?: string;
}

export type Params = {
  limit: number;
  page: number;
};
