import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './SignUpView.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Loader from '../../Components/Loader/Loader';

function SignUpView() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { createUserInFirestore } = useData();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password)
        .then(async (user) => {
          console.log(user.user.uid);
          await createUserInFirestore(user);
        })
        .catch((error) => {
          console.log(`${error.code}: ${error.message}`);
        });
      history.push('/main');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className={style.wrapper}>
      {loading && <Loader />}
      <div className={style.container}>
        <h2 className={style.title}>Sign Up</h2>
        {error && <p className={style.error}>{error}</p>}
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <input
              type='email'
              className={style.input}
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder=''
              required
              id='email'
            />
            <label className={style.label} htmlFor='email'>
              email
            </label>
          </div>
          <div>
            <input
              type='password'
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder=''
              id='password'
              required
            />
            <label className={style.label} htmlFor='password'>
              password
            </label>
          </div>
          <div>
            <input
              type='password'
              className={style.input}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              placeholder=''
              id='passwordconfirm'
              required
            />
            <label className={style.label} htmlFor='passwordconfirm'>
              password confirmation
            </label>
          </div>

          <button disabled={loading} className={`${style.btn} ${style['btn-signup']}`}>
            sign up
          </button>
        </form>
      </div>
      <div className={style.subtext}>
        <p className=''>Already have an account?</p>
        <Link to='/login'>
          <button className={`${style.btn} ${style['btn-login']}`}>log In</button>
        </Link>
      </div>
      <Link to='/'>
        <button className={`${style.btn} ${style['btn-back']}`}>back to landing page</button>
      </Link>
    </div>
  );
}

export default SignUpView;
