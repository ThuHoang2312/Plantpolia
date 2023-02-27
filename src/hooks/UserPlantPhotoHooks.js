import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {createPlantPhotoTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useUserPlantPhotoHooks = (fileId = null) => {
  const {getDetailedMediaByTagName} = useApi();
  const [userPlantPhotoList, setUserPlantPhotoList] = useState([]);
  const {update} = useContext(MainContext);

  // Get the list of photos of user plant
  const fetchUserPlantPhotoList = async () => {
    try {
      const list = await getDetailedMediaByTagName(
        createPlantPhotoTagName(fileId)
      );
      setUserPlantPhotoList(list);
    } catch (error) {
      console.error(error);
    }
  };

  // Call loadMedia() only once when the component is loaded
  // Or when update state is changed
  useEffect(() => {
    fetchUserPlantPhotoList();
  }, [update]);

  return {
    userPlantPhotoList: userPlantPhotoList,
  };
};
