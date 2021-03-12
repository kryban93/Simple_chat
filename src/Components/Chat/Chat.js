import React, { useEffect, useState, useRef } from 'react';
import style from './Chat.module.scss';
import { useData } from '../../contexts/DataContext';
import MessageBox from '../MessageBox/MessageBox';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';

function Chat() {
  const { messagesArray, getAllMessages, currentRoom, currentUser } = useData();
  const [loading, setLoading] = useState(true);
  const messagesScrollRef = useRef(null);

  useEffect(() => {
    async function handleLoadMessages() {
      await getAllMessages(currentRoom);
      setLoading(false);
    }
    handleLoadMessages();
    //scrollToBottom();

    return () => {
      setLoading(true);
    };
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

  function scrollToBottom() {
    messagesScrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {loading && <Loader />}
      <div className={style.wrapper}>
        {messagesArray
          ? messagesArray.map((item) => (
              <div
                className={
                  item.user.uid === currentUser.uid
                    ? `${style.container} ${style['container-loggeduser']}`
                    : style.container
                }
              >
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
                  isCurrentUser={item.user.uid === currentUser.uid ? true : false}
                />
              </div>
            ))
          : null}
        {
          //<div ref={messagesScrollRef} />
        }
      </div>
    </>
  );
}

export default Chat;

Chat.propTypes = {
  messagesArray: PropTypes.array.isRequired,
  getAllMessages: PropTypes.isRequired,
  currentRoom: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};

Chat.defaultValues = {
  currentRoom: '',
};
