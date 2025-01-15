import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/components';
import styles from './MainContent.module.scss';
import { useAppDispatch } from '@/store';
import { selectCatState } from '@/store/selectors';
import { fetchCats } from '@/store/catsThunks';

const MainContent = () => {
  const { cats, isLoading, error } = useSelector(selectCatState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCats());
  }, []);

  return (
    <div className="container">
      <div className={styles.mainContent}>
        {isLoading && <h2>Идет загрузка котиков...</h2>}
        {error && <h2>{error}</h2>}
        {cats?.map((cat) => (
          <Card imgSrc={cat.url} isFavorite={false} key={cat.id} />
        ))}
      </div>
    </div>
  );
};

export { MainContent };
