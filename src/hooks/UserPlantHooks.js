import {useEffect, useState} from 'react';
import {userPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useUserPlantHooks = (defaultUserPlantList = [], userProfile) => {
  const {getDetailedMediaListByTagName} = useApi();

  const [userPlantList, setUserPlantList] = useState(defaultUserPlantList);
  const [userPlantListLoading, setUserPlantListLoading] = useState(false);
  const [userPlantListNeedsHydration, setUserPlantListNeedsHydration] =
    useState(false);

  useEffect(() => {
    if (!userPlantListNeedsHydration || !userProfile) {
      return;
    }
    (async () => {
      setUserPlantListLoading(true);
      const items = await getDetailedMediaListByTagName(userPlantTagName);
      const userItems = items.filter(
        (file) => file && file.user_id === userProfile.user_id
      );
      setUserPlantList(userItems);
      setUserPlantListLoading(false);
      setUserPlantListNeedsHydration(false);
    })();
  }, [userPlantListNeedsHydration, userProfile]);

  return {
    userPlantList: userPlantList,
    userPlantListLoading: userPlantListLoading,
    setUserPlantListNeedsHydration: setUserPlantListNeedsHydration,
  };
};
