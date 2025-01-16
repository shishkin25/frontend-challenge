import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/components';
import styles from './AllCats.module.scss';
import { useAppDispatch } from '@/store';
import { selectCatState } from '@/store/selectors';
import { fetchCats } from '@/store/catsThunks';

const AllCats = () => {
  const { cats, isLoading, error } = useSelector(selectCatState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(fetchCats());
    }
  }, [dispatch, cats.length]);

  return (
    <div className="container">
      <div className={styles.allCats}>
        {isLoading && <h2 className="infoTitle">Идет загрузка котиков...</h2>}
        {error && <h2 className="infoTitle">{error}</h2>}
        <div className="gridLayout">
          {cats?.map((cat) => (
            <Card
              imgSrc={cat.url}
              isFavorite={cat.isFavorite}
              id={cat.id}
              key={cat.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { AllCats };
