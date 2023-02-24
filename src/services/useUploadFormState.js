import {useState} from 'react';

export const useUpLoadFormState = (plant) => {
  const [title, setTitle] = useState('');
  const [waterInterval, setWaterInterval] = useState('');
  const [level, setLevel] = useState('');
  const [liquidFertilizing, setLiquidFertilizing] = useState('');
  const [waterInstruction, setWaterInstruction] = useState('');
  const [clean, setClean] = useState('');
  const [otherNames, setOtherNames] = useState('');

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
    level: {
      value: level,
      set: setLevel,
    },
    liquidFertilizing: {
      value: liquidFertilizing,
      set: setLiquidFertilizing,
    },
    waterInstruction: {
      value: waterInstruction,
      set: setWaterInstruction,
    },
    clean: {
      value: clean,
      set: setClean,
    },
    otherNames: {
      value: otherNames,
      set: setOtherNames,
    },
  };
};
