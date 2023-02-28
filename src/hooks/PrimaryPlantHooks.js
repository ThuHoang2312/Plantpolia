import {useEffect, useState} from 'react';
import {primaryPlantTagName} from '../utils/variables';
import {useApi} from './ApiHooks';
import {safeJsonParse} from '../utils/safeJsonParse';

// PLANTS
/** @type {import('../types/PrimaryPlantModel').UsePrimaryPlantHooks} */
export const usePrimaryPlantHooks = ({defaultPrimaryPlantList}) => {
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

      /** @type {import('../types/PrimaryPlantModel').GetPrimaryPlantList} */
      const items = await getDetailedMediaListByTagName(primaryPlantTagName);

      const parsedItems = items.map((item) => {
        item.description = safeJsonParse(item.description);
        return item;
      });

      setPrimaryPlantList(parsedItems);
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
