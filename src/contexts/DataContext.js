import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { randomId } from '../additional';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [roomsArray, setRoomsArray] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const roomsRef = database.collection('rooms');
  const usersRef = database.collection('users');

  useEffect(() => {
    readRoomsList();
  }, []);

  function authUserWithFirebase(user) {
    let tempUser;
    usersRef
      .where('uid', '==', user.user.uid)
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

    usersRef.add({
      email: tempUser.email,
      uid: tempUser.uid,
      photoUrl: tempUser.photoUrl,
    });
  }

  function readRoomsList() {
    roomsRef.onSnapshot(
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

  function createRoom() {
    const users = [];
    console.log(currentUser);
    users.push(currentUser);
    roomsRef
      .add({
        roomId: randomId(),
        users: users,
        creator: currentUser,
      })
      .then((ref) => {
        console.log('Room created with ID', ref.id);
      })
      .catch((error) => {
        console.log('Error adding document: ', error);
      });
  }

  const value = {
    roomsArray,
    createRoom,
    currentUser,
    createUserInFirestore,
    authUserWithFirebase,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
