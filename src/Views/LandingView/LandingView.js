import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import style from './LandingView.module.scss';
import undrawGuysTyping from '../../assets/undraw_guys_typing.svg';

const LandingView = () => {
  return (
    <div className={style.wrapper}>
      <nav className={style.nav}>
        <img src={logo} alt='logo' className={style.nav_logo} />
        <Link to='/login'>
          <button className={`${style.nav_btn} ${style['nav_btn-login']}`}>login</button>
        </Link>
        <Link to='/signup'>
          <button className={`${style.nav_btn} ${style['nav_btn-signup']}`}>sign up</button>
        </Link>
      </nav>

      <section className={style.about} id='about'>
        <img src={undrawGuysTyping} alt='friends writting on chat' className={style.about_img} />
        <div className={style.about_content}>
          <h2>
            <strong> Plathewi </strong>makes it easy and fun to stay close to everyone You need to.
            Create and join rooms that focus on your hobbies and itrests.{' '}
            <Link to='/signup' style={{ color: 'blue' }}>
              Join now
            </Link>{' '}
            for free.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default LandingView;
