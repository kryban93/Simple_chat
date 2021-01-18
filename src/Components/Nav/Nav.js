import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import style from './Nav.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function Nav() {
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  function handleLogout() {
    try {
      logout();
      history.push('/login');
    } catch {
      setError('Failed to logout');
    }
  }
  return (
    <nav className={style.nav}>
      <img src={logo} alt='logo icon' className={style.icon} />
      <button className={style.btn} onClick={handleLogout}>
        logout
      </button>
      {error ? <p>{error}</p> : null}
    </nav>
  );
}

export default Nav;
