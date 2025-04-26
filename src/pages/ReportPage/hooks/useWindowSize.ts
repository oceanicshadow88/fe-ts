import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const getSize = (): WindowSize => ({ width: window.innerWidth, height: window.innerHeight });

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useWindowSize;
