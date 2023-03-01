import {useEffect, useState} from 'react';
import {primaryPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';
import {safeJsonParse} from '../utils/safeJsonParse';
import {useLogger} from '../services/useLogger';

// PLANTS
/** @type {import('../types/TypedHooks').UsePrimaryPlantHooks} */
export const usePrimaryPlantHooks = ({defaultPrimaryPlantList}) => {
  const {getDetailedMediaListByTagName} = useApi();
  const {log} = useLogger('usePrimaryPlantHooks');
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

      const items = await fetchPrimaryPlantList({
        getDetailedMediaListByTagName,
        log,
      });
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

/** @type {import('../types/TypedFunctions').FetchPrimaryPlantList} */
export const fetchPrimaryPlantList = async ({
  log,
  getDetailedMediaListByTagName,
}) => {
  const items = await getDetailedMediaListByTagName(primaryPlantTagName);
  return items.map((item) => {
    return {
      ...item,
      description: safeJsonParse(item.description),
    };
  });
};
