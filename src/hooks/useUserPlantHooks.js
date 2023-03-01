import {useEffect, useState} from 'react';
import {userPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';
import {safeJsonParse} from '../utils/safeJsonParse';
import {useLogger} from '../services/useLogger';

/** @type {import('../types/TypedHooks').UseUserPlantHooks} */
export const useUserPlantHooks = ({defaultUserPlantList, userProfile}) => {
  const {getDetailedMediaListByTagName} = useApi();
  const {log} = useLogger('useUserPlantHooks');

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
      const userItems = await fetchUserPlantList({
        getDetailedMediaListByTagName,
        log,
        userId: userProfile.user_id.toString(),
      });
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

/** @type {import('../types/TypedFunctions').FetchUserPlantList} */
export const fetchUserPlantList = async ({
  userId,
  log,
  getDetailedMediaListByTagName,
}) => {
  const items = await getDetailedMediaListByTagName(userPlantTagName);
  const userItems = items
    .filter((file) => file && file.user_id.toString() === userId)
    .map((item) => {
      return {
        ...item,
        description: safeJsonParse(item.description),
      };
    });

  return userItems;
};
