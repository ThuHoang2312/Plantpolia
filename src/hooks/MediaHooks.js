import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {
  baseUrl,
  primaryPlantTagName,
  userPlantTagName,
} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useMedia = (myFilesOnly, fileId = null) => {
  const {getFileByTag} = useApi();
  const [primaryPlantList, setPrimaryPlantList] = useState([]);
  const [userPlantList, setUserPlantList] = useState([]);
  const [userPlantPhotoList, setUserPlantPhotoList] = useState([]);
  const {update, user} = useContext(MainContext);
  const [load, setLoad] = useState(false);

  // Get the list of plant option for adding plant
  const fetchPrimaryPlantList = async () => {
    setLoad(true);
    try {
      const json = await getFileByTag(primaryPlantTagName);
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
      let json = await getFileByTag(userPlantTagName);
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
      const json = await getFileByTag(`${fileId}${userPlantTagName}`);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
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

  return {
    primaryPlantList: primaryPlantList,
    userPlantList: userPlantList,
    userPlantPhotoList: userPlantPhotoList,
    load,
  };
};
