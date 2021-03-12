import React, { useState } from 'react';
import style from './Sidebar.module.scss';
import { useData } from '../../contexts/DataContext';
import icons from '../../assets/icons';

function Sidebar({ handleSelectRoom }) {
  const { roomsArray, createRoom, joinRoom, currentRoom } = useData();
  const [createRoomName, setCreateRoomName] = useState('');
  const [createRoomPassword, setCreateRoomPassword] = useState('');
  const [isCreatePanelOpen, setCreatePanelState] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomPassword, setJoinRoomPassword] = useState('');
  const [isJoinPanelOpen, setJoinPanelState] = useState(false);
  const [error, setError] = useState();

  function handleCreateRoom(event) {
    event.preventDefault();
    if (createRoomPassword.length <= 3) {
      setError('Password need at least 4 letters');
    } else {
      createRoom(createRoomName, createRoomPassword);
      setCreatePanelState(false);
      setError();
    }
  }

  function handleJoinRoom(event) {
    event.preventDefault();

    joinRoom(joinRoomId, joinRoomPassword);
    setJoinPanelState(false);
  }

  function handleOpenCreateBox() {
    setCreatePanelState(!isCreatePanelOpen);
    setJoinPanelState(false);
  }

  function handleOpenJoinBox() {
    setJoinPanelState(!isJoinPanelOpen);
    setCreatePanelState(false);
  }

  return (
    <div className={style.container}>
      <div className={style.rooms}>
        {roomsArray.map((room) => (
          <div
            className={
              currentRoom === room.roomId
                ? `${style.rooms_item} ${style['rooms_item-active']}`
                : style.rooms_item
            }
            key={room.roomId}
            onClick={() => handleSelectRoom(room.roomId)}
          >
            <p className={style.rooms_item_title}>{room.name}</p>
            <p className={style.rooms_item_subtext}>{room.roomId}</p>
          </div>
        ))}
      </div>
      <div className={style.panel}>
        {isCreatePanelOpen ? (
          <div className={style.popup}>
            <button
              onClick={() => setCreatePanelState(!isCreatePanelOpen)}
              className={`${style.btn} ${style['btn-close']}`}
            >
              <img src={icons.close_white} alt='close create room panel' />
            </button>

            <div>
              <input
                type='text'
                className={style.input}
                onChange={(e) => setCreateRoomName(e.target.value)}
                value={createRoomName}
                required
                id='name'
              />
              <label className={style.label} htmlFor='name'>
                name
              </label>
            </div>
            <div>
              <input
                type='password'
                className={style.input}
                onChange={(e) => setCreateRoomPassword(e.target.value)}
                value={createRoomPassword}
                required
                id='password'
              />
              <label className={style.label} htmlFor='password'>
                password
              </label>
            </div>
            {error ? <p className={style.error}>{error}</p> : null}
            <button onClick={handleCreateRoom} className={`${style.btn} ${style['btn-action']}`}>
              create
            </button>
          </div>
        ) : null}
        {isJoinPanelOpen ? (
          <div className={style.popup}>
            <button
              onClick={() => setJoinPanelState(!isJoinPanelOpen)}
              className={`${style.btn} ${style['btn-close']}`}
            >
              <img src={icons.close_white} alt='close join room panel' />
            </button>
            <div>
              <input
                type='text'
                className={style.input}
                onChange={(e) => setJoinRoomId(e.target.value)}
                value={joinRoomId}
                required
                id='roomId'
              />
              <label className={style.label} htmlFor='roomId'>
                room id
              </label>
            </div>
            <div>
              <input
                type='password'
                className={style.input}
                onChange={(e) => setJoinRoomPassword(e.target.value)}
                value={joinRoomPassword}
                required
                id='password'
              />
              <label className={style.label} htmlFor='password'>
                password
              </label>
            </div>
            <button onClick={handleJoinRoom} className={`${style.btn} ${style['btn-action']}`}>
              join
            </button>
          </div>
        ) : null}
        <button className={style.panel_btn} onClick={handleOpenCreateBox}>
          <img
            src={icons.create_black}
            className={style.panel_icon}
            alt='create room panel button'
          />
          create
        </button>
        <button className={style.panel_btn} onClick={handleOpenJoinBox}>
          <img src={icons.join_black} className={style.panel_icon} alt='join room panel button' />
          join
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
