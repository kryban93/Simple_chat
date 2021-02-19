import React, { useState } from 'react';
import style from './InputBox.module.scss';
import icons from '../../assets/icons';
import { useData } from '../../contexts/DataContext';

function InputBox() {
  const { currentRoom, sendMessage } = useData();
  const [message, setMessage] = useState('');

  async function handleMessageSubmit() {
    await sendMessage(currentRoom, message);
    setMessage('');
  }

  async function handleMessageEnterKeyPress(event) {
    if (event.key === 'Enter') {
      await sendMessage(currentRoom, message);
      setMessage('');
    } else return;
  }

  return (
    <div className={style.container}>
      <input
        type='text'
        className={style.input}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder='Write message...'
        onKeyPress={handleMessageEnterKeyPress}
      />
      <button className={style.btn} onClick={() => handleMessageSubmit()}>
        <p>send</p>
        <img src={icons.send_white} alt='send icon' />
      </button>
    </div>
  );
}

export default InputBox;
