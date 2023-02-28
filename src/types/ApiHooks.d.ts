// import {TagMediaModelList} from './MediaModel';
import {IUserModel} from './UserModel';

// export type GetMediaByTag = (tagName: string) => Promise<TagMediaModelList>;

export interface UserLoginResponse {
  message: string;
  token: string;
  user: IUserModel;
}
export type UserLogin = (userCredentials: {
  username: string;
  password: string;
}) => Promise<UserLoginResponse>;
