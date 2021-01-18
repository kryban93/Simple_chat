import React, { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import style from './MainView.module.scss';
import sendIcon from '../../assets/send.svg';
import MessageBox from '../../Components/MessageBox/MessageBox';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useData } from '../../contexts/DataContext';

function MainView() {
  const [message, setMessage] = useState('');
  const { currentUser } = useData();
  useEffect(() => {
    //readDataFromDatabase();
    console.log(currentUser);
  }, [currentUser]);

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
      <Sidebar />
      <div className={style.chat}>
        {currentUser ? <p>{currentUser.email}</p> : null}
        {currentUser ? <p>{currentUser.uid}</p> : null}
        {/*messagesArray
          ? messagesArray.map((item) => (
              <MessageBox
                key={`${messagesArray.indexOf(item)}`}
                text={item.text}
                userId={item.user}
              />
            ))
          : null */}
      </div>
      <div className={style.messagebox}>
        <input
          type='text'
          className={style['messagebox_input']}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className={style['messagebox_btn']}>
          send
          <img src={sendIcon} alt='send icon' />
        </button>
      </div>
    </div>
  );
}

export default MainView;
