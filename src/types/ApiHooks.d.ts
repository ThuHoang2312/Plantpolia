import {CommentModel, PlantModel, UserModel} from './BaseModels';

export type HandleResponse<T = any, ERR = any> =
  | [T, null, number, any]
  | [null, ERR, number, any];
export type HandleResponseFunc<T = any, ERR = any> = (
  fetch: () => Promise<Response>
) => HandleResponse<T, ERR>;

export interface UserLoginResponse {
  message: string;
  token: string;
  user: UserModel;
}
export type UserLogin = (userCredentials: {
  username: string;
  password: string;
}) => Promise<UserLoginResponse>;

export type GetMediaCommentsById = (
  mediaId: string
) => Promise<HandleResponse<CommentModel[]>>;

export type GetDetailedMediaListByTagName = (
  mediaId: string
) => Promise<PlantModel[]>;
