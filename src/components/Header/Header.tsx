import styles from './Header.module.scss';
import { NavItemsType } from '@/types';

const NavItems: NavItemsType[] = ['Все котики', 'Любимые котики'];

interface HeaderProps {
  activeNavItem: NavItemsType;
  makeItemActive: (item: NavItemsType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeNavItem, makeItemActive }) => {
  const activeClasses = `${styles.item} ${styles.active}`;

  return (
    <header className={styles.header}>
      <div className="container">
        <nav>
          <ul className={styles.itemContainer}>
            {NavItems.map((item) => (
              <li
                className={activeNavItem === item ? activeClasses : styles.item}
                onClick={() => makeItemActive(item)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };
