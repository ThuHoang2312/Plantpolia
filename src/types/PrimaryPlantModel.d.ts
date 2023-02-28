import {PlantModel} from './PlantModel';
import {Dispatch} from 'react';

export interface PrimaryPlantModel extends Omit<PlantModel, 'description'> {
  description: {
    otherNames: string;
    difficulty: string;
    waterInstruction: string;
    cleaningInstruction: string;
    fertilizerInstruction: string;
    waterInterval: string | number;
  } | null;
}
export type PrimaryPlantModelList = PrimaryPlantModel[];
export type GetPrimaryPlantList = PrimaryPlantModel[];
export type UsePrimaryPlantHooks = (props: {
  defaultPrimaryPlantList: PrimaryPlantModel[];
}) => {
  primaryPlantList: PrimaryPlantModel[];
  primaryPlantListLoading: boolean;
  setPrimaryPlantListNeedsHydration: Dispatch<boolean>;
};
