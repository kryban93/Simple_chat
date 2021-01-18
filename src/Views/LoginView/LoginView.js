import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './LoginView.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

function LoginView() {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { authUserWithFirebase } = useData();
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailState, passwordState)
        .then((user) => {
          authUserWithFirebase(user);
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
    <div className={style.container}>
      <h2>Login to start chat</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        {error && <p className=''>{error}</p>}
        <label className=''>
          <p>email</p>
          <input
            className=''
            type='email'
            onChange={(e) => setEmailState(e.target.value)}
            value={emailState}
            required
          />
        </label>
        <label className=''>
          <p>password</p>
          <input
            className=''
            type='password'
            onChange={(e) => setPasswordState(e.target.value)}
            value={passwordState}
            required
          />
        </label>

        <button disabled={loading} type='submit' className=''>
          login
        </button>

        <div>
          <Link to='/forgot-password'>Forgot password?</Link>
        </div>
      </form>

      <div className=''>
        <p className=''>Need an account? </p>
        <Link to='/signup'>
          <button className=''>sign Up</button>
        </Link>
      </div>
      <Link to='/'>
        <button className=''>back to landing page</button>
      </Link>
    </div>
  );
}

export default LoginView;
