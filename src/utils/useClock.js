import {useEffect, useState} from 'react';

export const useClock = () => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(Date.now());
    }, 1000 * 60);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return date;
};
