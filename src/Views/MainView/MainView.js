import React, { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import style from './MainView.module.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Chat from '../../Components/Chat/Chat';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import InputBox from '../../Components/InputBox/InputBox';
import useWindowDimensions from '../../additional/useWindowDimensions';
import menuIcon from '../../assets/icons/menu_black.svg';
import closeIcon from '../../assets/icons/close_black.svg';

function MainView() {
  const { authUserWithFirebase, selectRoom, readRoomsList } = useData();
  const [isSidebarVisible, setSidebarVisibleState] = useState(true);
  const [isMenuIconVisible, setMenuIconVisibleState] = useState(false);
  const { authUser } = useAuth();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const init = async () => {
      await authUserWithFirebase(authUser);

      readRoomsList(authUser);
    };
    function handleWindowResize() {
      if (width > 768) {
        setSidebarVisibleState(true);
        setMenuIconVisibleState(false);
      } else {
        setMenuIconVisibleState(true);
        setSidebarVisibleState(false);
      }
    }

    handleWindowResize();
    init();
  }, [authUser, width]);

  function handleSelectRoom(roomId) {
    selectRoom(roomId);
  }

  function handleOpenSidebar() {
    setSidebarVisibleState(!isSidebarVisible);
  }

  return (
    <main className={style.wrapper}>
      {isMenuIconVisible ? (
        <button className={style.btn} onClick={() => handleOpenSidebar()}>
          <img src={isSidebarVisible ? closeIcon : menuIcon} alt='handle sidebar open button' />
        </button>
      ) : null}
      <Nav />
      {isSidebarVisible ? <Sidebar handleSelectRoom={handleSelectRoom} /> : null}
      <div className={style.container}>
        <Chat />
        <InputBox />
      </div>
    </main>
  );
}

export default MainView;
