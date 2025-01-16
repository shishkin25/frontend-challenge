import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/components';
import styles from './AllCats.module.scss';
import { useAppDispatch } from '@/store';
import { selectCatState } from '@/store/selectors';
import { fetchCats } from '@/store/catsThunks';

const AllCats = () => {
  const { cats, isLoading, error, allCatsCount } = useSelector(selectCatState);
  const [page, setPage] = useState(1);
  const limit = 5;
  const allPages = Math.ceil((allCatsCount ? +allCatsCount : 100) / limit);
  const lastElement = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const dispatch = useAppDispatch();

  // для бесконечного скролла
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    const callback = function (entries: any) {
      if (entries[0].isIntersecting && page < allPages) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
  }, [isLoading, page]);

  useEffect(() => {
    dispatch(fetchCats({ limit, page }));
  }, [page]);

  return (
    <div className="container">
      <div className={styles.allCats}>
        <div className="grid-layout">
          {cats?.map((cat, index) => (
            <Card
              imgSrc={cat.url}
              isFavorite={cat.isFavorite}
              id={cat.id}
              key={index}
            />
          ))}
        </div>
        {error && <h2 className="info-title">{error}</h2>}
        {isLoading && <h2 className="info-title">...загружаем котиков...</h2>}
      </div>
      <div ref={lastElement} className="el-for-infinite-scroll"></div>
    </div>
  );
};

export { AllCats };
