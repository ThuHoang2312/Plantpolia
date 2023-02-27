import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {userPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useUserPlantHooks = () => {
  const {getDetailedMediaByTagName} = useApi();
  const [userPlantList, setUserPlantList] = useState([]);
  const {update, user} = useContext(MainContext);

  // Get the list of user plant
  const fetchUserPlantList = async () => {
    try {
      const json = await getDetailedMediaByTagName(userPlantTagName);
      const media = json.filter(
        (file) => file && file.user_id === user.user_id
      );
      setUserPlantList(media);
    } catch (error) {
      console.error(error);
    }
  };

  // Get the list of photos of user plant

  // Call loadMedia() only once when the component is loaded
  // Or when update state is changed
  useEffect(() => {
    fetchUserPlantList();
  }, [update]);

  return {
    userPlantList: userPlantList,
  };
};
