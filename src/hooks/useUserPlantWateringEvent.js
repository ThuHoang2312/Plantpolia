import {useEffect, useState} from 'react';
import {userPlantWateringEventName} from '../utils/variables';
import {useApi} from './ApiHooks';
import {useLogger} from '../services/useLogger';

/** @type {import('../types/TypedHooks').UseUserPlantWateringEvent} */
export const useUserPlantWateringEvent = ({
  defaultWateringEventList,
  userPlantList,
}) => {
  const {getMediaCommentsById} = useApi();
  const {log} = useLogger('useUserPlantWateringEvent');

  const [wateringEventList, setWateringEventList] = useState(
    defaultWateringEventList
  );
  const [wateringEventListLoading, setWateringEventListLoading] =
    useState(false);
  const [wateringEventListNeedsHydration, setWateringEventListNeedsHydration] =
    useState(false);

  useEffect(() => {
    (async () => {
      setWateringEventListLoading(true);

      const list = await fetchMediaListComments({
        userPlantList,
        log,
        getMediaCommentsById,
      });

      setWateringEventList(list);
      setWateringEventListLoading(false);
      setWateringEventListNeedsHydration(false);
      log('UserPlantWateringEvent Updated.');
    })();
  }, [wateringEventListNeedsHydration, userPlantList]);

  return {
    wateringEventList: wateringEventList,
    wateringEventListLoading: wateringEventListLoading,
    setWateringEventListNeedsHydration: setWateringEventListNeedsHydration,
  };
};

/** @type {import('../types/TypedFunctions').FetchMediaListComments} */
export const fetchMediaListComments = async ({
  userPlantList,
  log,
  getMediaCommentsById,
}) => {
  const list = await Promise.all(
    userPlantList.map(async (item) => {
      const [items, err] = await getMediaCommentsById(item.file_id.toString());
      if (err) {
        log(err);
      }
      return (items ?? [])
        .filter((item) => item && item.comment === userPlantWateringEventName)
        .map((item) => {
          return {
            ...item,
            time_added: new Date(item.time_added),
          };
        });
    })
  );

  return list.flat();
};

/** @type {import('../types/TypedFunctions').CheckPlantWaterNeed} */
export const checkPlantWaterNeed = ({plantWateringEvents, waterInterval}) => {
  if (plantWateringEvents.length === 0) {
    return true;
  }
  const sortedPlantWateringEvents = plantWateringEvents.sort(
    (a, b) => a.time_added.getTime() - b.time_added.getTime()
  );

  const lastWateringEvent =
    sortedPlantWateringEvents[plantWateringEvents.length - 1];

  const nowInMilliseconds = Date.now();

  const lastWateringEventTimeInMilliseconds =
    lastWateringEvent.time_added.getTime();

  const waterIntervalInMilliseconds = 86_400_000 * waterInterval;

  return (
    lastWateringEventTimeInMilliseconds <
    nowInMilliseconds - waterIntervalInMilliseconds
  );
};
