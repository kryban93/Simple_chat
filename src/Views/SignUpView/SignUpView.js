import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './SignUpView.module.scss';
import { useAuth } from '../../contexts/AuthContext';

function SignUpView() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(login, password);
      history.push('/main');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className={style.container}>
      <h2>Sign Up form</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label className={style.label}>
          <input
            type='email'
            className={style.input}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            placeholder='login'
            required
          />
          login
        </label>
        <label className={style.label}>
          <input
            type='password'
            className={style.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='password'
            required
          />
          password
        </label>
        <label className={style.label}>
          <input
            type='password'
            className={style.input}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            placeholder='confirm password'
            required
          />
          password confirmation
        </label>
        <button disabled={loading}>Sign up</button>
      </form>

      <div className=''>
        <p className=''>Already have an account?</p>
        <Link to='/login'>
          <button className=''>log In</button>
        </Link>
      </div>
      <Link to='/'>
        <button className=''>back to landing page</button>
      </Link>
    </div>
  );
}

export default SignUpView;
