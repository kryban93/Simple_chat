import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Nav from '../../Components/Nav/Nav';
import style from './MainView.module.scss';
import { database } from '../../firebase';

function MainView() {
  const [message, setMessage] = useState('');
  const [messagesArray, setMessagesArray] = useState([]);
  const { currentUser } = useAuth();
  let messagesRef = database.ref('messages');

  useEffect(() => {
    readDataFromDatabase();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let newMessage = messagesRef.push();
    newMessage.set({
      user: currentUser.email,
      timestamp: new Date(),
      message,
    });
  }

  function readDataFromDatabase() {
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const tempState = [];
      for (let item in data) {
        tempState.push({
          message: data[item].message,
          user: data[item].user,
        });
      }
      console.log(tempState);
      setMessagesArray(tempState);
    });
  }

  return (
    <div>
      <Nav />
      <p>hello</p>
      <p>{currentUser.email}</p>

      {messagesArray
        ? messagesArray.map((item) => (
            <p key={`${messagesArray.indexOf(item)}`}>
              {item.message} , {item.user}
            </p>
          ))
        : null}

      <div className={style.messagebox}>
        <input
          type='text'
          className={style['messagebox_input']}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className={style['messagebox_btn']} onClick={handleSubmit}>
          send
        </button>
      </div>
    </div>
  );
}

export default MainView;
