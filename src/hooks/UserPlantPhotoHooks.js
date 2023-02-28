import {useEffect, useState} from 'react';
import {createPlantPhotoTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useUserPlantPhotoHooks = (fileId = null) => {
  const {getDetailedMediaListByTagName} = useApi();
  const [userPlantPhotoList, setUserPlantPhotoList] = useState([]);
  const [userPlantPhotoListLoading, setUserPlantPhotoListLoading] =
    useState(false);
  const [
    userPlantPhotoListNeedsHydration,
    setUserPlantPhotoListNeedsHydration,
  ] = useState(true);

  useEffect(() => {
    (async () => {
      if (!userPlantPhotoListNeedsHydration) {
        return;
      }
      setUserPlantPhotoListLoading(true);
      const list = await getDetailedMediaListByTagName(
        createPlantPhotoTagName(fileId)
      );
      setUserPlantPhotoList(list);
      setUserPlantPhotoListLoading(false);
      setUserPlantPhotoListNeedsHydration(false);
    })();
  }, [userPlantPhotoListNeedsHydration]);

  return {
    userPlantPhotoList: userPlantPhotoList,
    setUserPlantPhotoListNeedsHydration: setUserPlantPhotoListNeedsHydration,
    userPlantPhotoListLoading: userPlantPhotoListLoading,
  };
};
