import { useState } from 'react';
import styles from './Header.module.scss';

type NavItemsType = 'Все котики' | 'Любимые котики';
const NavItems: NavItemsType[] = ['Все котики', 'Любимые котики'];

const Header = () => {
  const [activeNavItem, setActiveNavItem] =
    useState<NavItemsType>('Все котики');

  const activeClasses = `${styles.item} ${styles.active}`;

  const makeItemActive = (item: NavItemsType) => {
    setActiveNavItem(item);
  };

  return (
    <header className={styles.header}>
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
    </header>
  );
};

export { Header };
