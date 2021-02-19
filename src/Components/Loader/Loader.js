import React from 'react';
import style from './Loader.module.scss';

function Loader() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
      </div>
    </div>
  );
}

export default Loader;
