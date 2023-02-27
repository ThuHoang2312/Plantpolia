import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {primaryPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const usePrimaryPlantHooks = () => {
  const {getDetailedMediaByTagName} = useApi();
  const [primaryPlantList, setPrimaryPlantList] = useState([]);
  const {update} = useContext(MainContext);

  // Get the list of plant option for adding plant
  const fetchPrimaryPlantList = async () => {
    try {
      const list = await getDetailedMediaByTagName(primaryPlantTagName);
      setPrimaryPlantList(list);
    } catch (error) {
      console.error(error);
    }
  };

  // Get the list of photos of user plant
  // Call loadMedia() only once when the component is loaded
  // Or when update state is changed
  useEffect(() => {
    fetchPrimaryPlantList();
  }, [update]);

  return {
    primaryPlantList: primaryPlantList,
  };
};
