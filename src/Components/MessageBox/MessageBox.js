import React from 'react';
import style from './MessageBox.module.scss';

function MessageBox({ text, userId, photoUrl, timestamp }) {
  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  return (
    <div className={style.container}>
      <p className={style.text}>{text}</p>
      <p className={style.time}>
        {hours}:{minutes}
      </p>
    </div>
  );
}

export default MessageBox;
