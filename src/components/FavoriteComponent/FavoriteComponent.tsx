import { useEffect, useRef } from 'react';
import { EmptyHeartIcon, FilledHeartIcon } from '@/components';
import styles from './FavoriteComponent.module.scss';

interface FavoriteComponentProps {
  isFavorite: boolean;
}

const FavoriteComponent: React.FC<FavoriteComponentProps> = ({
  isFavorite,
}) => {
  const filledHeartRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = () => {
    filledHeartRef.current?.classList.add(styles.pressed);
  };

  const handleMouseUp = () => {
    filledHeartRef.current?.classList.remove(styles.pressed);
  };

  useEffect(() => {
    filledHeartRef.current?.addEventListener('mousedown', handleMouseDown);
    filledHeartRef.current?.addEventListener('mouseup', handleMouseUp);
    return () => {
      filledHeartRef.current?.removeEventListener('mousedown', handleMouseDown);
      filledHeartRef.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  let emptyHeartClasses, filledHeartClasses;

  if (!isFavorite) {
    emptyHeartClasses = `${styles.icon} ${styles.favoriteBorder}`;
    filledHeartClasses = `${styles.icon} ${styles.favorite}`;
  } else {
    emptyHeartClasses = `${styles.icon} ${styles.noFavoriteBorder}`;
    filledHeartClasses = `${styles.icon} ${styles.onlyFavorite}`;
  }

  return (
    <div className={styles.heartWrapper}>
      <div className={emptyHeartClasses}>
        <EmptyHeartIcon />
      </div>
      <div className={filledHeartClasses} ref={filledHeartRef}>
        <FilledHeartIcon />
      </div>
    </div>
  );
};

export { FavoriteComponent };
