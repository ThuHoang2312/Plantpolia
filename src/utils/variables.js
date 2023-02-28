export const baseUrl = 'https://media.mw.metropolia.fi/wbma/';
export const uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
export const primaryPlantTagName = 'plantpoliaPrimaryPlant';
export const userPlantTagName = 'plantpoliaUserPlant';

//  TODO: Create a better tag
export const createPlantPhotoTagName = (fileId) => {
  return `plantpoliaPlantPhoto_${fileId}`;
};
export const createUserAvatarTagName = (userId) => {
  return `avatar_${userId}`;
};

export const applicationPrefixId = 'plantpolia.';
export const requestedPlantTagName = 'plantpoliaRequest';
