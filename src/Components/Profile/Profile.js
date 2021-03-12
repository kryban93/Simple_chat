import React, { useEffect, useState } from 'react';
import style from './Profile.module.scss';
import icons from '../../assets/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';

function Profile() {
  const { logout } = useAuth();
  const { currentUser, setUserName } = useData();
  const history = useHistory();
  const [isProfileSidebarOpen, setProfileSidebarState] = useState(false);
  const [error, setError] = useState('');
  const [isNameUserPanelOpen, setUserNamePanelState] = useState(false);
  const [userName, setUserNameState] = useState('');

  useEffect(() => {
    console.log(currentUser);
  }, []);

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

  async function handleUserNamePanel() {
    await setUserName(userName);
  }

  return (
    <div className={style.container}>
      <button
        className={`${style.btn} ${style['btn-profile']}`}
        onClick={() => handleProfileSidebar()}
      >
        <img src={icons.profile_black} alt='profile button icon' className={style.icon} />
      </button>

      {isProfileSidebarOpen ? (
        <div className={style.sidebar}>
          {'name' in currentUser ? (
            <h3 className={style.title}>{currentUser.name}</h3>
          ) : (
            <h3 className={style.title}>{currentUser.email}</h3>
          )}

          <button
            onClick={() => setUserNamePanelState(!isNameUserPanelOpen)}
            className={`${style.btn} ${style['btn-sidebar']}`}
          >
            Set nickname
          </button>
          {isNameUserPanelOpen ? (
            <div className={style.popup}>
              <input
                onChange={(e) => setUserNameState(e.target.value)}
                value={userName}
                className={style.input}
                placeholder='name'
              />
              <button
                onClick={handleUserNamePanel}
                className={`${style.btn} ${style['btn-panel']}`}
              >
                set name
              </button>
            </div>
          ) : null}
          <button className={`${style.btn} ${style['btn-sidebar']}`}>Set profile photo</button>
          <button className={`${style.btn} ${style['btn-sidebar']}`}>Update password</button>

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
