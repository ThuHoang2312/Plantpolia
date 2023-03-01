import {GetDetailedMediaListByTagName, GetMediaCommentsById} from './ApiHooks';
import {CommentModel, PrimaryPlantModel, UserPlantModel} from './BaseModels';

export type FetchUserPlantList = (props: {
  userId: string;
  log: (...args: any) => void;
  getDetailedMediaListByTagName: GetDetailedMediaListByTagName;
}) => Promise<UserPlantModel[]>;

export type FetchPrimaryPlantList = (props: {
  log: (...args: any) => void;
  getDetailedMediaListByTagName: GetDetailedMediaListByTagName;
}) => Promise<PrimaryPlantModel[]>;

export type FetchMediaListComments = (props: {
  userPlantList: UserPlantModel[];
  log: (...args: any) => void;
  getMediaCommentsById: GetMediaCommentsById;
}) => Promise<CommentModel[]>;

export type CheckPlantWaterNeed = (props: {
  plantWateringEvents: CommentModel[];
  waterInterval: number;
}) => boolean;
