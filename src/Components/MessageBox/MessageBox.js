import React from 'react';
import style from './MessageBox.module.scss';

function MessageBox({ text, userId, photoUrl }) {
  return (
    <div className={style.container}>
      <p className={style.text}>{text}</p>
    </div>
  );
}

export default MessageBox;
