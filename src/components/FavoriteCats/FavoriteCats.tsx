import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './FavoriteCats.module.scss';
import { selectCatState } from '@/store/selectors';
import { Card } from '@/components';
import { useAppDispatch } from '@/store';
import { setOnlyFavoriteCats } from '@/store/catSlice';
import { Cat } from '@/types';

const FavoriteCats = () => {
  const { onlyFavoriteCats } = useSelector(selectCatState);

  const dispatch = useAppDispatch();

  // на случай обновления страницы
  useEffect(() => {
    const storedCats = localStorage.getItem('onlyFavoriteCats');
    if (storedCats) {
      const parsedFavorites: Cat[] = JSON.parse(storedCats);
      const uniqueFavorites: Record<string, Cat> = {};
      [...parsedFavorites, ...onlyFavoriteCats].forEach((cat) => {
        uniqueFavorites[cat.id] = cat;
      });

      dispatch(setOnlyFavoriteCats(Object.values(uniqueFavorites)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('onlyFavoriteCats', JSON.stringify(onlyFavoriteCats));
  }, [onlyFavoriteCats]);

  return (
    <div className="container">
      <div className={styles.favoriteCats}>
        {!onlyFavoriteCats.length ? (
          <h2 className="info-title">Нет любимых котиков:(</h2>
        ) : (
          <div className="grid-layout">
            {onlyFavoriteCats.map((cat) => (
              <Card
                imgSrc={cat.url}
                isFavorite={cat.isFavorite}
                id={cat.id}
                key={cat.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { FavoriteCats };
