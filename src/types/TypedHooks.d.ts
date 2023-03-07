import {
  CommentModel,
  PrimaryPlantModel,
  UserModel,
  UserPlantModel,
} from './BaseModels';
import {Dispatch} from 'react';

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
