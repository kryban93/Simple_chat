import React, { useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import randomId from '../additional/randomId';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [roomsArray, setRoomsArray] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentRoom, setCurrentRoom] = useState();
  const [messagesArray, setMessagesArray] = useState([]);
  const [error, setError] = useState('');
  const roomsRef = database.collection('rooms');
  const usersRef = database.collection('users');

  useEffect(() => {
    return () => {
      setMessagesArray([]);
      setCurrentRoom('');
      setCurrentUser({});
    };
  }, []);

  function authUserWithFirebase(user) {
    let tempUser;
    usersRef
      .where('uid', '==', user.uid)
      .get()
      .then((query) =>
        query.forEach((doc) => {
          tempUser = doc.data();
          setCurrentUser(tempUser);
          console.log('Authorized with firebase!');
        })
      )
      .catch((error) => {
        setError('error getting users list: ', error);
      });
  }

  function createUserInFirestore(user) {
    const tempUser = {
      email: user.user.email,
      uid: user.user.uid,
      photoUrl: 'www.stockphoto.com',
    };

    setCurrentUser(tempUser);

    usersRef
      .doc(`${user.user.uid}`)
      .set({
        email: tempUser.email,
        uid: tempUser.uid,
        photoUrl: tempUser.photoUrl,
      })
      .then(() => {
        console.log('User succesfully created');
      })
      .catch((error) => {
        setError('error while creating User: ', error);
      });
  }

  function setUserName(name) {
    usersRef
      .doc(currentUser.uid)
      .set(
        {
          name,
        },
        { merge: true }
      )
      .then(() => {
        console.log('Succesfully set user name');
      })
      .catch((error) => {
        setError('Error while setting user name: ', error);
      });
  }

  function readRoomsList(user) {
    usersRef
      .doc(user.uid)
      .collection('rooms')
      .onSnapshot(
        (snapshotQueries) => {
          const tempState = [];
          snapshotQueries.forEach((doc) => {
            tempState.push(doc.data());
          });
          setRoomsArray(tempState);
        },
        (error) => {
          setError('Cannot read the data, error: ', error);
        }
      );
  }

  function createRoom(name, password) {
    const users = [];
    let roomId;
    users.push(currentUser);
    roomId = randomId();
    roomsRef
      .doc(`${roomId}`)
      .set({
        roomId,
        users,
        creator: currentUser,
        name,
        password,
      })
      .then((ref) => {
        console.log('Room created with ID', ref.id);
      })
      .catch((error) => {
        setError('Error adding document: ', error);
      });

    usersRef
      .doc(currentUser.uid)
      .collection('rooms')
      .add({
        name,
        roomId: roomId,
      })
      .then(() => {
        console.log('Created room in user');
      })
      .catch((error) => {
        setError('error creating rooms array: ', error);
      });
  }

  function joinRoom(roomId, password) {
    const roomRef = roomsRef.doc(roomId);

    roomRef.get().then((doc) => {
      if (doc.exists) {
        const tempData = doc.data();

        if (tempData.password !== password) {
          setError('Wrong password');
        } else {
          console.log('correct!');
          let tempUsers = tempData.users;
          let roomName = tempData.name;
          tempUsers.push(currentUser);

          roomRef.update({
            users: tempUsers,
          });

          usersRef.doc(currentUser.uid).collection('rooms').add({
            name: roomName,
            roomId,
          });
        }
      } else {
        setError('No such room!');
      }
    });
  }

  function sendMessage(roomId, text) {
    let messagesRef = roomsRef.doc(roomId).collection('messages');

    messagesRef
      .add({
        text,
        user: currentUser,
        timestamp: Date.now(),
      })
      .catch((error) => {
        setError('error adding message: ', error);
      });
  }

  async function getAllMessages(roomId) {
    let messagesRef = roomsRef.doc(roomId).collection('messages');

    messagesRef.onSnapshot(
      async (snapshotQueries) => {
        const tempState = [];
        snapshotQueries.forEach((doc) => {
          tempState.push(doc.data());
        });
        const sortedState = tempState.sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp);
        });

        setMessagesArray(sortedState);
      },
      (error) => {
        setError('Cannot read the data, error: ', error);
      }
    );
  }

  function selectRoom(roomId) {
    setCurrentRoom(roomId);
  }

  const value = {
    roomsArray,
    createRoom,
    currentUser,
    createUserInFirestore,
    authUserWithFirebase,
    readRoomsList,
    joinRoom,
    selectRoom,
    currentRoom,
    sendMessage,
    messagesArray,
    getAllMessages,
    setUserName,
    error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
