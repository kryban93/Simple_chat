import React, { useEffect, useState } from 'react';
import style from './Error.module.scss';
import { useData } from '../../contexts/DataContext';

function Error() {
  const { error } = useData();
  const [isVisible, setVisibleState] = useState(false);

  useEffect(() => {
    error !== '' ? setVisibleState(true) : setVisibleState(false);

    setTimeout(() => {
      setVisibleState(false);
    }, 3000);
  }, [error]);

  return (
    <div className={style.wrapper}>
      {isVisible && (
        <div className={style.container}>
          <p className={style.text}>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Error;
