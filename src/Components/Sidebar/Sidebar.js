import React, { useState, useEffect } from 'react';
import style from './Sidebar.module.scss';
import { useData } from '../../contexts/DataContext';
import createIcon from '../../assets/icons/create_black.svg';
import joinIcon from '../../assets/icons/join_black.svg';

function Sidebar() {
  const { roomsArray, createRoom, readRoomsList } = useData();
  const [createRoomName, setCreateRoomName] = useState('');
  const [createRoomPassword, setCreateRoomPassword] = useState('');
  const [isCreatePanelOpen, setCreatePanelState] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomPassword, setJoinRoomPassword] = useState('');
  const [isJoinPanelOpen, setJoinPanelState] = useState(false);

  useEffect(() => {
    readRoomsList();
  }, []);

  async function handleCreateRoom(event) {
    event.preventDefault();
    await createRoom(createRoomName, createRoomPassword);
  }

  //function handleJoinRoom(event) {
  //  event.preventDefault();
  // }

  return (
    <div className={style.container}>
      <div className={style.rooms}>
        {roomsArray.map((room) => (
          <p key={room.roomId}>{room.name}</p>
        ))}
      </div>
      <div className={style.panel}>
        {isCreatePanelOpen ? (
          <div className={style.popup}>
            <button
              onClick={() => setCreatePanelState(!isCreatePanelOpen)}
              className={style.btn_close}
            >
              {' '}
              close
            </button>
            <input
              type='text'
              className={style.input}
              onChange={(e) => setCreateRoomName(e.target.value)}
              value={createRoomName}
              required
              placeholder='room name'
            />
            <input
              type='password'
              className={style.input}
              onChange={(e) => setCreateRoomPassword(e.target.value)}
              value={createRoomPassword}
              required
              placeholder='password'
            />
            <button onClick={handleCreateRoom}>create</button>
          </div>
        ) : null}
        {isJoinPanelOpen ? (
          <div className={style.popup}>
            <button onClick={() => setJoinPanelState(!isJoinPanelOpen)} className={style.btn_close}>
              {' '}
              close
            </button>
            <input
              type='text'
              className={style.input}
              onChange={(e) => setJoinRoomId(e.target.value)}
              value={joinRoomId}
              required
              placeholder='room id'
            />
            <input
              type='password'
              className={style.input}
              onChange={(e) => setJoinRoomPassword(e.target.value)}
              value={joinRoomPassword}
              required
              placeholder='password'
            />
            <button>join</button>
          </div>
        ) : null}
        <button className={style.panel_btn} onClick={() => setCreatePanelState(!isCreatePanelOpen)}>
          <img src={createIcon} className={style.panel_icon} alt='create room panel button' />
          create
        </button>
        <button className={style.panel_btn} onClick={() => setJoinPanelState(!isJoinPanelOpen)}>
          <img src={joinIcon} className={style.panel_icon} alt='join room panel button' />
          join
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
