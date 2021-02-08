import React from 'react';
import logo from '../../assets/logo.svg';
import style from './Nav.module.scss';
import Profile from '../Profile/Profile';

function Nav() {
  return (
    <nav className={style.nav}>
      <img src={logo} alt='logo icon' className={style.logo} />
      <Profile />
    </nav>
  );
}

export default Nav;
