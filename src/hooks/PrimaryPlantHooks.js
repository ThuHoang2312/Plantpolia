import {useEffect, useState} from 'react';
import {primaryPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';

// PLANTS
export const usePrimaryPlantHooks = (defaultPrimaryPlantList = []) => {
  const {getDetailedMediaListByTagName} = useApi();
  const [primaryPlantList, setPrimaryPlantList] = useState(
    defaultPrimaryPlantList
  );
  const [primaryPlantListLoading, setPrimaryPlantListLoading] = useState(false);
  const [primaryPlantListNeedsHydration, setPrimaryPlantListNeedsHydration] =
    useState(false);

  useEffect(() => {
    if (!primaryPlantListNeedsHydration) {
      return;
    }
    (async () => {
      setPrimaryPlantListLoading(true);
      const items = await getDetailedMediaListByTagName(primaryPlantTagName);
      setPrimaryPlantList(items);
      setPrimaryPlantListLoading(false);
      setPrimaryPlantListNeedsHydration(false);
    })();
  }, [primaryPlantListNeedsHydration]);

  return {
    primaryPlantList: primaryPlantList,
    primaryPlantListLoading: primaryPlantListLoading,
    setPrimaryPlantListNeedsHydration: setPrimaryPlantListNeedsHydration,
  };
};
