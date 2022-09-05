import React from 'react';
import { BsJournalText } from 'react-icons/bs';
import style from './style/Header.module.css';

const Header = () => (
  <header className={style.header}>
    <BsJournalText />
    <p>Caderneta Online</p>
  </header>
);

export default Header;