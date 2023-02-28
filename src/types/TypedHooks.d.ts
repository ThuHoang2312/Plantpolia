import {PrimaryPlantModel} from './PrimaryPlantModel';
import {Dispatch} from 'react';

export type UseNewUserPlantForm = (props: {
  primaryPlant: PrimaryPlantModel;
}) => {
  title: string;
  setTitle: Dispatch<string>;
  lastWater: {label: string; value: string};
  setLastWater: Dispatch<{label: string; value: string}>;
};