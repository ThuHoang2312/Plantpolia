import {PrimaryPlantModel} from './PrimaryPlantModel';
import {NewUserPlantModel} from './UserPlantModel';
import {FC} from 'react';

export type UploadFormSubmit = (data: NewUserPlantModel) => void;

export type UploadForm = FC<{
  primaryPlant: PrimaryPlantModel;
  onSubmit: UploadFormSubmit;
  cancelSubmit: () => void;
}>;
