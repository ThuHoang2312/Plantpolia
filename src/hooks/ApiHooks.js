import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {
  baseUrl,
  primaryPlantTagName,
  userPlantTagName,
} from '../utils/variables';

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
const useAuthentication = () => {
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

  return {postLogin};
};

const useUser = () => {
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

  return {postUser, checkUsername, getUserByToken, putUser};
};

// PLANTS
const useMedia = (myFilesOnly, fileId = null) => {
  const [primaryPlantList, setPrimaryPlantList] = useState([]);
  const [userPlantList, setUserPlantList] = useState([]);
  const [userPlantPhotoList, setUserPlantPhotoList] = useState([]);
  const {update, user} = useContext(MainContext);
  const [load, setLoad] = useState(false);

  // Get the list of plant option for adding plant
  const fetchPrimaryPlantList = async () => {
    setLoad(true);
    try {
      const json = await useTag().getFileByTag(primaryPlantTagName);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );

      setPrimaryPlantList(media);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  // Get the list of user plant
  const fetchUserPlantList = async () => {
    setLoad(true);
    try {
      let json = await useTag().getFileByTag(userPlantTagName);
      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      setUserPlantList(media);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  // Get the list of photos of user plant
  const fetchUserPlantPhotoList = async () => {
    setLoad(true);
    try {
      const json = await useTag().getFileByTag(`${fileId}${userPlantTagName}`);
      console.log(json);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      console.log(media);
      setUserPlantPhotoList(media);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  // Call loadMedia() only once when the component is loaded
  // Or when update state is changed
  useEffect(() => {
    fetchPrimaryPlantList();
    fetchUserPlantList();
    fetchUserPlantPhotoList();
  }, [update]);

  // Upload plant
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

  // Modify plant
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
    } finally {
      setLoad(false);
    }
  };

  // Delete plant
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
    } finally {
      setLoad(false);
    }
  };

  return {
    primaryPlantList: primaryPlantList,
    userPlantList: userPlantList,
    userPlantPhotoList: userPlantPhotoList,
    postMedia,
    load,
    putMedia,
    deleteMedia,
  };
};

// CREATE TAG
const useTag = () => {
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

  return {postTag, getFileByTag};
};

export {useUser, useAuthentication, useTag, useMedia};
