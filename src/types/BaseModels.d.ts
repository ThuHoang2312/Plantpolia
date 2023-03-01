import {ImagePickerAsset} from 'expo-image-picker/src/ImagePicker.types';

export interface MediaModel {
  file_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
  thumbnails: {
    w640: string;
    w320: string;
    w160: string;
  };
}

export interface CommentModel {
  comment_id: number;
  file_id: number;
  user_id: number;
  comment: string;
  time_added: Date;
}

export interface UserModel {
  email: string;
  full_name: string;
  is_admin: unknown;
  time_created: string;
  user_id: number;
  username: string;
}

export interface PlantModel extends MediaModel {}

export interface PrimaryPlantModelDescription {
  otherNames: string;
  difficulty: string;
  waterInstruction: string;
  cleaningInstruction: string;
  fertilizerInstruction: string;
  waterInterval: string | number;
}
export interface PrimaryPlantModel extends Omit<PlantModel, 'description'> {
  description: PrimaryPlantModelDescription | null;
}

export interface UserPlantModelDescription {
  otherNames: string;
  difficulty: string;
  waterInstruction: string;
  cleaningInstruction: string;
  fertilizerInstruction: string;
  waterInterval: string | number;

  waterAmount: string | number;
}

export interface UserPlantModel extends Omit<PlantModel, 'description'> {
  description: UserPlantModelDescription | null;
}
export interface NewUserPlantModel
  extends Pick<UserPlantModel, 'title' | 'description'> {
  selectedImage: ImagePickerAsset;
}

export interface ChipModel {
  disabled: boolean;
  title: string;
  status: 'normal' | 'info' | 'alert';
}

export type ChipModelList = ChipModel[];
