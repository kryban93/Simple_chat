import React, { useState } from 'react';
import style from './Profile.module.scss';
import profileIcon from '../../assets/icons/profile_black.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';

function Profile() {
  const { logout } = useAuth();
  const { currentUser } = useData();
  const history = useHistory();
  const [isProfileSidebarOpen, setProfileSidebarState] = useState(false);
  const [error, setError] = useState('');

  function handleProfileSidebar() {
    setProfileSidebarState(!isProfileSidebarOpen);
  }

  function handleLogout() {
    try {
      logout();
      history.push('/login');
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <div className={style.container}>
      <button
        className={`${style.btn} ${style['btn-profile']}`}
        onClick={() => handleProfileSidebar()}
      >
        <img src={profileIcon} alt='profile button icon' className={style.icon} />
      </button>

      {isProfileSidebarOpen ? (
        <div className={style.sidebar}>
          <h3>{currentUser.email}</h3>

          <button className={`${style.btn} ${style['btn-logout']}`} onClick={() => handleLogout()}>
            logout
          </button>
          {error ? <p>{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
