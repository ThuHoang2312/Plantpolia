import {PlantModel} from './PlantModel';
import {Dispatch} from 'react';
import {IUserModel} from './UserModel';

export interface UserPlantModel extends Omit<PlantModel, 'description'> {
  description: {
    otherNames: string;
    waterInstruction: string;
    cleaningInstruction: string;
    fertilizerInstruction: string;
    waterInterval: string | number;
  } | null;
}
export interface NewUserPlantModel
  extends Pick<UserPlantModel, 'title' | 'description'> {}

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
