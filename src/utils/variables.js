import Constants from 'expo-constants';

//  Data coming from environment variable
let {APP_VERSION} = Constants.expoConfig.extra;

APP_VERSION = APP_VERSION ?? '1';

export const baseUrl = 'https://media.mw.metropolia.fi/wbma/';
export const uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
export const applicationPrefixId = `plantpolia.v${APP_VERSION}.`;
export const userPlantTagName = `${applicationPrefixId}user.plant`;
export const primaryPlantTagName = `${applicationPrefixId}primary.plant`;
export const requestedPlantTagName = `${applicationPrefixId}requested.primary.plant`;
export const userPlantWateringEventName = `${applicationPrefixId}user.plant.watered`;

export const createPlantPhotoTagName = (fileId) => {
  return `${applicationPrefixId}plant.id.${fileId}.photo`;
};
export const createUserAvatarTagName = (userId) => {
  return `${applicationPrefixId}user.id.${userId}.avatar`;
};
