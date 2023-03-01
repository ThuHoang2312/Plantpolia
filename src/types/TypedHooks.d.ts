import {
  CommentModel,
  PrimaryPlantModel,
  UserModel,
  UserPlantModel,
} from './BaseModels';
import {Dispatch} from 'react';

export type UseNewUserPlantForm = (props: {
  primaryPlant: PrimaryPlantModel;
}) => {
  title: string;
  setTitle: Dispatch<string>;
  lastWater: {label: string; value: string};
  setLastWater: Dispatch<{label: string; value: string}>;
};

export type UseNotification = (props: {userPlantList: UserPlantModel[]}) => {};
export type UseUserPlantWateringEvent = (props: {
  userPlantList: UserPlantModel[];
  defaultWateringEventList: CommentModel[];
}) => {
  wateringEventList: CommentModel[];
  wateringEventListLoading: boolean;
  setWateringEventListNeedsHydration: Dispatch<boolean>;
};
export type UsePrimaryPlantHooks = (props: {
  defaultPrimaryPlantList: PrimaryPlantModel[];
}) => {
  primaryPlantList: PrimaryPlantModel[];
  primaryPlantListLoading: boolean;
  setPrimaryPlantListNeedsHydration: Dispatch<boolean>;
};

export type UseUserPlantHooks = (props: {
  defaultUserPlantList: UserPlantModel[];
  userProfile: UserModel | null;
}) => {
  userPlantList: UserPlantModel[];
  userPlantListLoading: boolean;
  setUserPlantListNeedsHydration: Dispatch<boolean>;
};
