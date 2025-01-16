import { useState } from 'react';
import './App.css';
import { Header, AllCats, FavoriteCats } from './components';
import { NavItemsType } from './types';

function App() {
  const [activeNavItem, setActiveNavItem] =
    useState<NavItemsType>('Все котики');

  const makeItemActive = (item: NavItemsType) => {
    setActiveNavItem(item);
  };

  return (
    <>
      <Header activeNavItem={activeNavItem} makeItemActive={makeItemActive} />
      {activeNavItem === 'Все котики' ? <AllCats /> : <FavoriteCats />}
    </>
  );
}

export default App;
