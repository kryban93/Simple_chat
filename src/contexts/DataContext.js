import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import randomId from '../additional/randomId';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [roomsArray, setRoomsArray] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const roomsRef = database.collection('rooms');
  const usersRef = database.collection('users');

  function authUserWithFirebase(user) {
    let tempUser;
    usersRef
      .where('uid', '==', user.uid)
      .get()
      .then((query) =>
        query.forEach((doc) => {
          tempUser = doc.data();
          console.log(tempUser);
          setCurrentUser(tempUser);
        })
      )
      .catch((error) => {
        console.log('error getting users list: ', error);
      });
  }

  function createUserInFirestore(user) {
    const tempUser = {
      email: user.user.email,
      uid: user.user.uid,
      photoUrl: 'www.stockphoto.com',
    };

    setCurrentUser(tempUser);

    usersRef.doc(`${user.user.uid}`).set({
      email: tempUser.email,
      uid: tempUser.uid,
      photoUrl: tempUser.photoUrl,
    });
  }

  function readRoomsList() {
    usersRef
      .doc(currentUser.uid)
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
          console.log('Cannot read the data, error: ', error);
        }
      );
  }

  function createRoom(name, password) {
    const users = [];
    let roomId;
    console.log(currentUser);
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
        console.log('Error adding document: ', error);
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
        console.error('error creating rooms array: ', error);
      });
  }

  const value = {
    roomsArray,
    createRoom,
    currentUser,
    createUserInFirestore,
    authUserWithFirebase,
    readRoomsList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
