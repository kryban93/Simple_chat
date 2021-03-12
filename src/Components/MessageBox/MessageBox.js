import React from 'react';
import style from './MessageBox.module.scss';
import { useData } from '../../contexts/DataContext';
import PropTypes from 'prop-types';

function MessageBox({ text, userId, photoUrl, timestamp, isCurrentUser }) {
  const { currentUser } = useData();
  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  return (
    <div
      className={
        isCurrentUser ? `${style.container} ${style['container-loggeduser']}` : `${style.container}`
      }
    >
      <p className={style.text}>{text}</p>
      <p className={style.time}>
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}
      </p>
    </div>
  );
}

export default MessageBox;

MessageBox.propTypes = {
  text: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};
