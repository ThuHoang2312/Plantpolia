import {baseUrl} from '../utils/variables';

/** @type {import('../types/ApiHooks').HandleResponseFunc} */
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

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
export const useApi = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'login', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('getUserByToken: ' + error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser: ' + error.message);
    }
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const options = {
      method: 'GET',
    };
    try {
      const result = await doFetch(
        baseUrl + 'users/username/' + username,
        options
      );
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getFileByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  const getMediaById = async (mediaId) => {
    return handleResponse(async () => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      return await fetch(baseUrl + `media/${mediaId}`, {
        method: 'GET',
        headers,
      });
    });
  };

  /** @type {import('../types/ApiHooks').GetMediaCommentsById} */
  const getMediaCommentsById = async (mediaId) => {
    return handleResponse(async () => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      return await fetch(baseUrl + `comments/file/${mediaId}`, {
        method: 'GET',
        headers,
      });
    });
  };

  const postCommentByMediaId = async (mediaId, commentValue, token) => {
    return handleResponse(async () => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', token);
      return await fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify({file_id: mediaId, comment: commentValue}),
        headers,
      });
    });
  };

  /** @type {import('../types/ApiHooks').GetDetailedMediaListByTagName} */
  const getDetailedMediaListByTagName = async (tagName) => {
    const json = await getFileByTag(tagName);
    const media = await Promise.all(
      json.map(async (item) => {
        const [mediaData] = await getMediaById(item.file_id);
        return mediaData;
      })
    );
    return media;
  };

  // Function to add plant
  const postMedia = async (formData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      body: formData,
    };
    return await doFetch(baseUrl + 'media', options);
  };

  // Function to delete plant
  const deleteMedia = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'media/' + fileId, options);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to edit plant
  const putMedia = async (id, data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'media/' + id, options);
    } catch (error) {
      console.error(error);
    }
  };

  // Function for adding rate for app
  const addRating = async (ratingData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(ratingData),
    };
    return await doFetch(baseUrl + 'ratings', options);
  };

  // Function to get ratings for file
  const getRatingsForFile = async (fileId, token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(`${baseUrl}ratings/file/${fileId}`, options);
  };

  // Function to delete ratings
  const deleteRating = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(`${baseUrl}ratings/file/${fileId}`, options);
  };

  return {
    postLogin,
    postUser,
    checkUsername,
    getUserByToken,
    putUser,
    postTag,
    getFileByTag: getFileByTag,
    getDetailedMediaListByTagName: getDetailedMediaListByTagName,
    getMediaById: getMediaById,
    postMedia,
    deleteMedia,
    putMedia,
    getMediaCommentsById: getMediaCommentsById,
    postCommentByMediaId: postCommentByMediaId,
    addRating,
    getRatingsForFile,
    deleteRating,
  };
};
