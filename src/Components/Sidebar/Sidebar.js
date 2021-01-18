import React from 'react';
import style from './Sidebar.module.scss';
import { useData } from '../../contexts/DataContext';

function Sidebar() {
  const { roomsArray, createRoom } = useData();

  async function handleClick(event) {
    event.preventDefault();
    await createRoom();
  }

  return (
    <div className={style.container}>
      {roomsArray.map((room) => (
        <p key={room.roomId}>{room.roomId}</p>
      ))}
      <button onClick={handleClick}>Create Room</button>
      <div>
        <button>Join Room</button>
      </div>
    </div>
  );
}

export default Sidebar;
