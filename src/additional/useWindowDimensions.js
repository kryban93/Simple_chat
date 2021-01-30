import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};
