const baseUrl = 'https://media.mw.metropolia.fi/wbma/';
const uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';

const {writeFileSync, createWriteStream, createReadStream} = require('fs');
const path = require('path');
const FormData = require('form-data');

const fetch = (...args) =>
  // @ts-ignore
  import('node-fetch').then(({default: fetch, FormData}) => fetch(...args));

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

const getMediaById = async ({mediaId}) => {
  return handleResponse(async () => {
    return await fetch(baseUrl + `media/${mediaId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });
};

const getFilesByTag = async ({tag}) => {
  return handleResponse(async () => {
    return await fetch(baseUrl + `tags/${tag}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  });
};

const downloadImage = async (imageUrl, filePath) => {
  fetch(imageUrl).then((res) => res.body.pipe(createWriteStream(filePath)));
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

async function downloadPrimaryPlantsFromDatabaseAndSaveOnDisk(
  primaryPlantTagName,
  saveOnDisk
) {
  const [data] = await getFilesByTag({
    tag: primaryPlantTagName,
  });

  const detailedList = await Promise.all(
    (data ?? []).map(async (item) => {
      const [details] = await getMediaById({mediaId: item.file_id});
      return details;
    })
  );
  const parsedDetailedList = detailedList.map((item) => {
    item.description = JSON.parse(item.description);
    return item;
  });
  const parsedDetailedListWithImage = await Promise.all(
    parsedDetailedList.map(async (item, index) => {
      const imageName = `plantpolia_primary_${index}.jpg`;
      if (saveOnDisk) {
        await downloadImage(
          `${uploadUrl}${item.thumbnails.w640}`,
          path.resolve(__dirname, 'primary-plant-images', imageName)
        );
      }
      return {
        filename: imageName,
        title: item.title,
        description: item.description,
      };
    })
  );
  if (saveOnDisk) {
    writeFileSync(
      path.resolve(__dirname, 'seed-data.json'),
      JSON.stringify(parsedDetailedListWithImage, undefined, 4)
    );
  }
  return parsedDetailedListWithImage;
}

// downloadPrimaryPlantsFromDatabaseAndSaveOnDisk(
//   'plantpoliaPrimaryPlant',
//   false
// ).then((items) => {
//   // console.log(items.length);
// });

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

saveDiskPrimaryPlantsToDatabase(
  require('./seed-data.json'),
  'newPrimaryTagWhenNeeded',
  token
).then();
