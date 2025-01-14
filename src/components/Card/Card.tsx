import styles from './Card.module.scss';
import catImg from '@/assets/images/cat.jpg';
import { FavoriteComponent } from '@/components';

const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.img} src={catImg} alt="кошечка" />

      <div className={styles.favoriteWrapper}>
        <FavoriteComponent isFavorite={false} />
      </div>
    </div>
  );
};

export { Card };
