import React, {Context, Dispatch, PropsWithChildren} from 'react';
import {
  CommentModel,
  PrimaryPlantModel,
  UserModel,
  UserPlantModel,
} from './BaseModels';

export interface MainContextProviderProps {
  defaultPromoStatus: string;
  onPromoStatusSet: (status: string) => void;
  userProfile: UserModel | null;
  accessToken: string | null;
  expirationDate: number | null;
  defaultPrimaryPlantList: PrimaryPlantModel[];
  defaultUserPlantList: UserPlantModel[];
  defaultWateringEventList: CommentModel[];
  setUserProfile: (userModel: UserModel | null) => void;
  setAccessToken: (accessToken: string) => void;
  setExpirationDate: (expirationDate: number) => void;
}

export type MainContextProviderFC = React.FC<
  PropsWithChildren<MainContextProviderProps>
>;

export interface MainContextModel {
  /**
   * Constant access token age in ms.
   */
  ACCESS_TOKEN_AGE_IN_MS: number;
  /**
   * When it's first time user interacts with the application
   */
  promoStatus: string;
  /**
   * TODO: Write description.
   */
  setPromoStatus: Dispatch<string>;
  /**
   * When it's true user is logged in.
   */
  isLoggedIn: boolean;
  /**
   * When there is a user profile and token, but it's expired.
   */
  isExpired: boolean;
  /**
   * Logged in user's UserProfile.
   */
  user: UserModel | null;
  /**
   * TODO: Write description.
   */
  setUser: Dispatch<UserModel | null>;
  /**
   * Logged in user's UserProfile.
   */
  expirationDate: number | null;
  /**
   * TODO: Write description.
   */
  setExpirationDate: Dispatch<number | null>;
  /**
   * Access token of the user.
   */
  token: string | null;
  /**
   * TODO: Write description.
   */
  setToken: Dispatch<string | null>;

  primaryPlantList: PrimaryPlantModel[];
  primaryPlantListLoading: boolean;
  setPrimaryPlantListNeedsHydration: Dispatch<boolean>;

  userPlantList: UserPlantModel[];
  userPlantListLoading: boolean;
  setUserPlantListNeedsHydration: Dispatch<boolean>;

  wateringEventList: CommentModel[];
  wateringEventListLoading: boolean;
  setWateringEventListNeedsHydration: Dispatch<boolean>;
}

export type MainContextReactContext = Context<MainContextModel>;
