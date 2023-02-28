import React, {Context, Dispatch, PropsWithChildren} from 'react';
import {IUserModel} from './UserModel';

export interface MainContextProviderProps {
  userProfile: IUserModel | null;
  accessToken: string | null;
  expirationDate: number | null;
  defaultPrimaryPlantList: any[];
  defaultUserPlantList: any[];
  setUserProfile: (userModel: IUserModel | null) => void;
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
  user: IUserModel | null;
  /**
   * TODO: Write description.
   */
  setUser: Dispatch<IUserModel | null>;
  /**
   * Logged in user's UserProfile.
   */
  expirationDate: number | null;
  /**
   * TODO: Write description.
   */
  setExpirationDate: Dispatch<number | null>;
  /**
   * TODO: Write description.
   */
  lastWater: any;
  /**
   * TODO: Write description.
   */
  setLastWater: Dispatch<any>;
  /**
   * TODO: Write description.
   */
  notificationTime: any;
  setNotificationTime: Dispatch<any>;
  /**
   * TODO: Write description.
   */
  image: any;
  /**
   * TODO: Write description.
   */
  setImage: Dispatch<any>;
  /**
   * TODO: Write description.
   */
  upload: any;
  setUpload: Dispatch<any>;
  /**
   * TODO: Write description.
   */
  type: any;
  /**
   * TODO: Write description.
   */
  setType: Dispatch<any>;
  /**
   * Access token of the user.
   */
  token: string | null;
  /**
   * TODO: Write description.
   */
  setToken: Dispatch<string | null>;

  primaryPlantList: any[];
  primaryPlantListLoading: boolean;
  setPrimaryPlantListNeedsHydration: Dispatch<boolean>;

  userPlantList: any[];
  userPlantListLoading: boolean;
  setUserPlantListNeedsHydration: Dispatch<boolean>;
}

export type MainContextReactContext = Context<MainContextModel>;
