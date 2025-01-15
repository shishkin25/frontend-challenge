import styles from './Card.module.scss';
import { FavoriteComponent } from '@/components';

interface CardProps {
  imgSrc: string;
  isFavorite: boolean;
}

const Card: React.FC<CardProps> = ({ imgSrc, isFavorite }) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.img} src={imgSrc} alt="Фото милого котенка" />

      <div className={styles.favoriteWrapper}>
        <FavoriteComponent isFavorite={isFavorite} />
      </div>
    </div>
  );
};

export { Card };
