import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';

const MainPage = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [counter, setCounter] = useState();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  let usersRef = database.ref('users');

  useEffect(() => {
    console.log('loading');
    console.log(usersRef);
    usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const tempState = [];
      for (let item in data) {
        tempState.push({
          login: data[item].login,
          password: data[item].password,
          userId: data[item].userId,
        });
      }
      console.log(tempState);
      setUsersArray(tempState);
      setCounter(data.length);
    });
  }, []);

  function handleSubmit(e) {
    let newUserRef = usersRef.push();
    e.preventDefault();
    console.log('lol');
    console.log(`${login} ${password}`);
    newUserRef.set({
      login: login,
      password: password,
      userId: `000${counter}`,
    });
  }

  return (
    <div>
      <h1>This is chat,see users</h1>
      {usersArray
        ? usersArray.map((item) => (
            <p key={`${usersArray.indexOf(item)}`}>
              {item.login} ,{item.password}
            </p>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            name='login'
            placeholder='login'
          />
        </label>
        <label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
            placeholder='password'
          />
        </label>
        <button>add</button>
      </form>
    </div>
  );
};

export default MainPage;
