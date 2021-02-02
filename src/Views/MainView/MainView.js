import React, { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import style from './MainView.module.scss';
import sendIcon from '../../assets/send.svg';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Chat from '../../Components/Chat/Chat';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

function MainView() {
  const [message, setMessage] = useState('');
  const { authUserWithFirebase, currentRoom, selectRoom, sendMessage } = useData();
  const { authUser } = useAuth();
  useEffect(() => {
    //readDataFromDatabase();

    authUserWithFirebase(authUser);
  }, [authUser]);

  function handleSelectRoom(roomId) {
    console.log(roomId);
    selectRoom(roomId);
  }

  function handleMessageSubmit() {
    sendMessage(currentRoom, message);
  }

  /* async function handleSubmit(event) {
    event.preventDefault();
    await messagesRef
      .add({
        user: currentUser.email,
        timestamp: Date.now(),
        text: message,
        photoURL: 'www.photo.com',
      })
      .then((ref) => {
        console.log('Document written with ID', ref.id);
      })
      .catch((error) => {
        console.log('Error adding document: ', error);
      });
  } */
  /*
  function readDataFromDatabase() {
    messagesRef.onSnapshot(
      (snapshotQueries) => {
        let tempState = [];
        snapshotQueries.forEach((doc) => {
          tempState.push(doc.data());
        });
        const sortedState = tempState.sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp);
        });

        setMessagesArray(sortedState);
      },
      (error) => {
        console.log('Cannot read the data, error: ', error);
      }
    );
  }*/

  return (
    <div>
      <Nav />
      <Sidebar handleSelectRoom={handleSelectRoom} />
      <div className={style.container}>
        <div className={style.chat}>
          <Chat />
        </div>
        <div className={style.messagebox}>
          <input
            type='text'
            className={style['messagebox_input']}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className={style['messagebox_btn']} onClick={() => handleMessageSubmit()}>
            send
            <img src={sendIcon} alt='send icon' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainView;
