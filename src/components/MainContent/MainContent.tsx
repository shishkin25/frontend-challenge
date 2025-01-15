import { Card } from '@/components';
import styles from './MainContent.module.scss';

const MainContent = () => {
  return (
    <div className="container">
      <div className={styles.mainContent}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export { MainContent };
