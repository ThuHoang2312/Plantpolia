import {PlantModel} from './PlantModel';
import {Dispatch} from 'react';
import {IUserModel} from './UserModel';
import {ImagePickerAsset} from 'expo-image-picker/src/ImagePicker.types';

export interface UserPlantModel extends Omit<PlantModel, 'description'> {
  description: {
    otherNames: string;
    waterInstruction: string;
    cleaningInstruction: string;
    fertilizerInstruction: string;
    waterInterval: number;
  } | null;
}
export interface NewUserPlantModel
  extends Pick<UserPlantModel, 'title' | 'description'> {
  selectedImage: ImagePickerAsset;
}

export type UserPlantModelList = UserPlantModel[];
export type GetUserPlantList = UserPlantModel[];
export type UseUserPlantHooks = (props: {
  defaultUserPlantList: UserPlantModel[];
  userProfile: IUserModel | null;
}) => {
  userPlantList: UserPlantModel[];
  userPlantListLoading: boolean;
  setUserPlantListNeedsHydration: Dispatch<boolean>;
};
