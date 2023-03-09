import {
  NewUserPlantModel,
  PrimaryPlantModel,
  UserPlantModel,
} from './BaseModels';
import {FC} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';

export type UploadFormSubmit = (data: NewUserPlantModel) => void;

export type UploadForm = FC<{
  primaryPlant: PrimaryPlantModel;
  onSubmit: UploadFormSubmit;
  cancelSubmit: () => void;
}>;

export type MyPlantListItem = FC<{
  plant: UserPlantModel;
  navigation: CompositeScreenProps;
  needsWater: boolean;
  needsNutrients: boolean;
  needsLight: boolean;
}>;

export type WateringProcessList = FC<{
  items: UserPlantModel[];
  onMoveUpPress: (index: number) => void;
  onMoveDownPress: (index: number) => void;
}>;

export type WateringProcessStartedParams = {
  userPlantListThatNeedsWater: UserPlantModel[];
};
