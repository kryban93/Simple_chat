import React, { useEffect } from 'react';
import style from './Chat.module.scss';
import { useData } from '../../contexts/DataContext';
import MessageBox from '../MessageBox/MessageBox';

function Chat() {
  const { messagesArray, getAllMessages, currentRoom } = useData();

  useEffect(() => {
    getAllMessages(currentRoom);
  }, [currentRoom]);

  return (
    <div className={style.container}>
      {messagesArray
        ? messagesArray.map((item) => (
            <MessageBox
              key={`${messagesArray.indexOf(item)}`}
              text={item.text}
              userId={item.user.uid}
              timestamp={item.timestamp}
            />
          ))
        : null}
    </div>
  );
}

export default Chat;
