import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ForgotPasswordView.module.scss';
import { useAuth } from '../../contexts/AuthContext';

function ForgotPasswordView() {
  const [emailState, setEmailState] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailState);
    } catch {
      setError('Failed to log in');
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2 className={style.title}>Write your email to send reset link</h2>
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
          <button
            disabled={loading}
            type='submit'
            className={`${style.btn} ${style['btn-forgot']}`}
          >
            send reset email
          </button>
        </form>
      </div>
      <div className={style.subtext}>
        <p>Need an account? </p>
        <Link to='/signup'>
          <button className={`${style.btn} ${style['btn-signup']}`}>sign Up</button>
        </Link>
        <p>Or just log in</p>
        <div>
          <Link to='/login'>
            <button className={`${style.btn} ${style['btn-login']}`}>login</button>
          </Link>
        </div>
      </div>
      <Link to='/'>
        <button className={`${style.btn} ${style['btn-back']}`}>back to landing page</button>
      </Link>
    </div>
  );
}

export default ForgotPasswordView;
