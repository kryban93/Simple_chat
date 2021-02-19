import React from 'react';
import style from './MessageBox.module.scss';
import { useData } from '../../contexts/DataContext';

function MessageBox({ text, userId, photoUrl, timestamp, isCurrentUser }) {
  const { currentUser } = useData();
  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  console.log(`${userId} ${currentUser.uid}`);
  return (
    <div
      className={
        isCurrentUser ? `${style.container} ${style['container-loggeduser']}` : `${style.container}`
      }
    >
      <p className={style.text}>{text}</p>
      <p className={style.time}>
        {hours}:{minutes}
      </p>
    </div>
  );
}

export default MessageBox;
