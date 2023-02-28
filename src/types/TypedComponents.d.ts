import {PrimaryPlantModel} from './PrimaryPlantModel';
import {NewUserPlantModel} from './UserPlantModel';
import {FC} from 'react';

export type UploadForm = FC<{
  primaryPlant: PrimaryPlantModel;
  onSubmit: (data: NewUserPlantModel) => void;
  cancelSubmit: () => void;
}>;
