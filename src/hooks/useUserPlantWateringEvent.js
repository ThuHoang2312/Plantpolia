import {useEffect, useState} from 'react';
import {
  DAY_IN_MILLI_SECONDS,
  userPlantWateringEventName,
} from '../utils/variables';
import {useApi} from './ApiHooks';
import {useLogger} from '../services/useLogger';
import {safeIntegerParse} from '../utils/safeIntegerParse';

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
        .filter(
          (item) => item && item.comment.startsWith(userPlantWateringEventName)
        )
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
  const sortedPlantWateringEvents = plantWateringEvents.sort((a, b) => {
    const aDate = a.comment.split('.').reverse()[0];
    const bDate = b.comment.split('.').reverse()[0];
    return safeIntegerParse(aDate) - safeIntegerParse(bDate);
  });

  const lastWateringEvent =
    sortedPlantWateringEvents[plantWateringEvents.length - 1];

  const nowInMilliseconds = Date.now();

  const lastWateringEventTime = lastWateringEvent.comment
    .split('.')
    .reverse()[0];

  const lastWateringEventTimeInMilliseconds = safeIntegerParse(
    lastWateringEventTime
  );

  const waterIntervalInMilliseconds = DAY_IN_MILLI_SECONDS * waterInterval;

  return (
    lastWateringEventTimeInMilliseconds <
    nowInMilliseconds - waterIntervalInMilliseconds
  );
};
