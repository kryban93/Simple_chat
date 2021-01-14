import React from 'react';
import { Link } from 'react-router-dom';
import './LoginView.scss';

function LoginView() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Login to start chat</h2>
      <form onSubmit={handleSubmit}>
        <button>login</button>
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

export default LoginView;
