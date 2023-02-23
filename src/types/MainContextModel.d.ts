import {Context} from 'react';

export interface MainContextModel extends Record<string, any> {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  // userProfile: IUserModel | null;
  // accessToken: (accessToken: string | null) => void;
  // expirationDate: string | number;
  // setUserProfile: (userModel: IUserModel) => void;
  // setAccessToken: (accessToken: string) => void;
  // setExpirationDate: (date: string) => void;
  // needsUpdate: boolean;
  // setNeedsUpdate: (needsUpdateNewValue: boolean) => void;
}

export type MainContextReactContext = Context<MainContextModel>;
