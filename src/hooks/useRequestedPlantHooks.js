import {useEffect, useState} from 'react';
import {requestedPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const useRequestedPlantHooks = (
  defaultRequestedPlantList = [],
  userProfile
) => {
  const {getDetailedMediaListByTagName} = useApi();

  const [requestedPlantList, setRequestedPlantList] = useState(
    defaultRequestedPlantList
  );
  const [requestedPlantListLoading, setRequestedPlantListLoading] =
    useState(false);
  const [
    requestedPlantListNeedsHydration,
    setRequestedPlantListNeedsHydration,
  ] = useState(false);

  useEffect(() => {
    if (!requestedPlantListNeedsHydration || !userProfile) {
      return;
    }
    (async () => {
      setRequestedPlantListLoading(true);
      const items = await getDetailedMediaListByTagName(requestedPlantTagName);
      const userItems = items.filter(
        (file) => file && file.user_id === userProfile.user_id
      );
      setRequestedPlantList(userItems);
      setRequestedPlantListLoading(false);
      setRequestedPlantListNeedsHydration(false);
    })();
  }, [requestedPlantListNeedsHydration, userProfile]);

  return {
    requestedPlantList: requestedPlantList,
    requestedPlantListLoading: requestedPlantListLoading,
    setRequestedPlantListNeedsHydration: setRequestedPlantListNeedsHydration,
  };
};
