import React, { useEffect } from 'react';
import style from './Chat.module.scss';
import { useData } from '../../contexts/DataContext';
import MessageBox from '../MessageBox/MessageBox';

function Chat() {
  const { messagesArray, getAllMessages, currentRoom } = useData();

  useEffect(() => {
    getAllMessages(currentRoom);
  }, [currentRoom]);

  function isUniqueUser(array, item) {
    // przelecieć po tablicy po elementach i jeżeli poprzedni element posiada uid takie jak w item to return null else return true
    const index = array.indexOf(item);
    if (array[index - 1] === undefined || array[index - 1].user.uid !== item.user.uid) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={style.wrapper}>
      {messagesArray
        ? messagesArray.map((item) => (
            <div className={style.container}>
              {isUniqueUser(messagesArray, item) ? (
                item.user.name === undefined ? (
                  <p className={style.user}>{item.user.email}</p>
                ) : (
                  <p className={style.user}>{item.user.name}</p>
                )
              ) : null}

              <MessageBox
                key={`${messagesArray.indexOf(item)}`}
                text={item.text}
                userId={item.user.uid}
                timestamp={item.timestamp}
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default Chat;
