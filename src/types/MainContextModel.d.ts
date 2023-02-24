import React, {Context, Dispatch, PropsWithChildren} from 'react';
import {IUserModel} from './UserModel';

export interface MainContextProviderProps {
  userProfile: IUserModel | null;
  accessToken: string | null;
  expirationDate: number | null;
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
   * When true means data needs to be updated.
   */
  update: boolean;
  /**
   * TODO: Write description.
   */
  setUpdate: Dispatch<boolean>;
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
   * TODO: Write description.
   */
  imageSelected: boolean;
  /**
   * TODO: Write description.
   */
  setImageSelected: Dispatch<boolean>;
  /**
   * Access token of the user.
   */
  token: string | null;
  /**
   * TODO: Write description.
   */
  setToken: Dispatch<string | null>;
}

type UseStateModel<VarName extends keyof MainContextModel> = [
  MainContextModel[VarName],
  Dispatch<MainContextModel[VarName]>
];

export type IsLoggedInUseStateModel = UseStateModel<'isLoggedIn'>;
export type UpdateUseStateModel = UseStateModel<'update'>;
export type LastWaterUseStateModel = UseStateModel<'lastWater'>;
export type NotificationTimeUseStateModel = UseStateModel<'notificationTime'>;
export type ImageUseStateModel = UseStateModel<'image'>;
export type ImageSelectedUseStateModel = UseStateModel<'imageSelected'>;
export type TypeUseStateModel = UseStateModel<'type'>;
export type UploadUseStateModel = UseStateModel<'upload'>;

export type MainContextReactContext = Context<MainContextModel>;
