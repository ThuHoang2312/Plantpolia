import {useState} from 'react';

export const useUpLoadFormState = () => {
  const [title, setTitle] = useState('');
  const [waterInterval, setWaterInterval] = useState('');

  // Check if the user input a valid number
  let isWaterIntervalValid = false;

  // TODO: add validate for input have to bigger than 0 ?
  if (!isNaN(waterInterval)) {
    isWaterIntervalValid = true;
  }

  return {
    title: {
      value: title,
      set: setTitle,
    },
    waterInterval: {
      value: waterInterval,
      set: setWaterInterval,
      valid: isWaterIntervalValid,
    },
  };
};
