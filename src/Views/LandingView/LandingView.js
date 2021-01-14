import React from 'react';
import { Link } from 'react-router-dom';
import './LandingView.scss';

const LandingView = () => {
  return (
    <>
      <nav className='nav'>
        <Link to='/login'>
          <button className='nav_btn nav_btn-login'>login</button>
        </Link>
        <Link to='/signup'>
          <button className='nav_btn nav_btn-signup'>sign up</button>
        </Link>
      </nav>
      <header className='header'>
        <h1>This is Landing View. Please SignUp or Login to preview Dashboard</h1>
      </header>
      <section className='content'>
        <p>This is some text about the page content.</p>
      </section>
    </>
  );
};

export default LandingView;
