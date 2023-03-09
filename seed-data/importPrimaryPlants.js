const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const {createReadStream} = require('fs');
const path = require('path');
const FormData = require('form-data');

const fetch = (...args) =>
  // @ts-ignore
  import('node-fetch').then(({default: fetch}) => fetch(...args));

const handleResponse = async (fetch) => {
  try {
    const response = await fetch();
    if (response.ok) {
      return [await response.json(), null, response.status, response];
    } else {
      return [null, await response.json(), response.status, response];
    }
  } catch (error) {
    return [null, error, 0, null];
  }
};

const uploadMedia = async ({accessToken, title, description, filePath}) => {
  return handleResponse(async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', createReadStream(filePath));

    return await fetch(baseUrl + 'media', {
      method: 'POST',
      body: formData,
      headers: {
        'x-access-token': accessToken,
      },
    });
  });
};

const postTag = async ({fileId, tag, accessToken}) => {
  return handleResponse(async () => {
    return await fetch(baseUrl + 'tags', {
      method: 'POST',
      body: JSON.stringify({
        file_id: fileId,
        tag,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      },
    });
  });
};

async function saveDiskPrimaryPlantsToDatabase(
  mediaList,
  tagName,
  accessToken
) {
  const mediaListWithImages = mediaList.map((item) => {
    return {
      item,
      filePath: path.resolve(__dirname, 'primary-plant-images', item.filename),
    };
  });
  const uploadResult = await Promise.all(
    mediaListWithImages.map(async ({item, filePath}) => {
      const [result, error] = await uploadMedia({
        accessToken,
        description: JSON.stringify(item.description),
        filePath,
        title: item.title,
      });
      console.log({
        title: item.title,
        result,
        error,
      });
      return result;
    })
  );

  const fileIds = uploadResult
    .map((item) => item?.file_id ?? null)
    .filter((item) => !!item);

  await Promise.all(
    fileIds.map(async (fileId) => {
      const [result, error] = await postTag({
        accessToken,
        tag: tagName,
        fileId,
      });
      console.log({
        fileId,
        result,
        error,
      });
    })
  );
}

const token = 'TODO: Fill with valid token';
const applicationPrefixId = `plantpolia.v${process.env.APP_VERSION}.`;
const primaryPlantTagName = `${applicationPrefixId}primary.plant`;
console.log('primaryPlantTagName: ', primaryPlantTagName);
console.log(process.env.PLANTPOLIA_TOKEN);
saveDiskPrimaryPlantsToDatabase(
  require('./seed-data.json'),
  primaryPlantTagName,
  process.env.PLANTPOLIA_TOKEN ?? token
).then();
