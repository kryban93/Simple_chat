import React, { useState } from 'react';
import style from './InputBox.module.scss';
import sendIcon from '../../assets/icons/send.svg';
import { useData } from '../../contexts/DataContext';

function InputBox() {
  const { currentRoom, sendMessage } = useData();
  const [message, setMessage] = useState('');

  async function handleMessageSubmit() {
    await sendMessage(currentRoom, message);
  }
  return (
    <div className={style.container}>
      <input
        type='text'
        className={style.input}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder='Write message...'
      />
      <button className={style.btn} onClick={() => handleMessageSubmit()}>
        <p>send</p>
        <img src={sendIcon} alt='send icon' />
      </button>
    </div>
  );
}

export default InputBox;
