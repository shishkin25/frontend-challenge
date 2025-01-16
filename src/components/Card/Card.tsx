import { Cat } from '@/types';
import styles from './Card.module.scss';
import { FavoriteComponent } from '@/components';
import { useAppDispatch } from '@/store';
import { changeOnlyFavoriteArray, toggleIsFavorite } from '@/store/catSlice';

interface CardProps {
  imgSrc: string;
  isFavorite: boolean;
  id: Cat['id'];
}

const Card: React.FC<CardProps> = ({ imgSrc, isFavorite, id }) => {
  const dispatch = useAppDispatch();

  const clickOnFavoriteIcon = (id: Cat['id']) => {
    dispatch(toggleIsFavorite(id));
    dispatch(changeOnlyFavoriteArray(id));
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.img} src={imgSrc} alt="Фото милого котенка" />

      <div
        className={styles.favoriteWrapper}
        onClick={() => clickOnFavoriteIcon(id)}
      >
        <FavoriteComponent isFavorite={isFavorite} />
      </div>
    </div>
  );
};

export { Card };
