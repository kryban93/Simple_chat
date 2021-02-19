import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './LoginView.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Loader from '../../Components/Loader/Loader';

function LoginView() {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { authUserWithFirebase, readRoomsList } = useData();
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailState, passwordState)
        .then(async (user) => {
          await authUserWithFirebase(user.user);
        })
        .then(async () => {
          await readRoomsList();
        })
        .catch((error) => {
          console.log(`${error.code}: ${error.message}`);
        });
      history.push('/main');
    } catch {
      setError('Failed to log in');
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      {loading && <Loader />}

      <div className={style.container}>
        <h2 className={style.title}>Login to start chat</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          {error && <p className=''>{error}</p>}
          <div>
            <input
              className={style.input}
              type='email'
              onChange={(e) => setEmailState(e.target.value)}
              value={emailState}
              required
              id='email'
            />
            <label className={style.label} htmlFor='email'>
              email
            </label>
          </div>
          <div>
            <input
              className={style.input}
              type='password'
              onChange={(e) => setPasswordState(e.target.value)}
              value={passwordState}
              required
              id='password'
            />
            <label className={style.label} htmlFor='password'>
              password
            </label>
          </div>
          <button disabled={loading} type='submit' className={`${style.btn} ${style['btn-login']}`}>
            login
          </button>

          <div>
            <Link to='/forgot'>Forgot password?</Link>
          </div>
        </form>
      </div>
      <div className={style.subtext}>
        <p>Need an account? </p>
        <Link to='/signup'>
          <button className={`${style.btn} ${style['btn-signup']}`}>sign Up</button>
        </Link>
      </div>
      <Link to='/'>
        <button className={`${style.btn} ${style['btn-back']}`}>back to landing page</button>
      </Link>
    </div>
  );
}

export default LoginView;
