import { Card } from '@/components';
import styles from './MainContent.module.scss';

const MainContent = () => {
  return (
    <div className="container">
      <div className={styles.mainContent}>
        <Card />
      </div>
    </div>
  );
};

export { MainContent };
