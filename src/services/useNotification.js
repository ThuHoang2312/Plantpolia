import {useCallback, useEffect} from 'react';
import {
  cancelScheduledNotificationAsync,
  getAllScheduledNotificationsAsync,
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications';
import {safeIntegerParse} from '../utils/safeIntegerParse';
import {useEnv} from './useEnv';
import {useLogger} from './useLogger';
import {useNotificationStatus} from './useNotificationStatus';
import {DAY_IN_SECONDS} from '../utils/variables';

/** @type {import('../types/TypedHooks').UseNotification} */
export const useNotification = ({userPlantList}) => {
  const {log} = useLogger('useNotification');
  const {isNotificationsGranted, notificationStatusLoaded} =
    useNotificationStatus();

  const {isDevice} = useEnv();

  const generateNotificationTitle = useCallback((plantName) => {
    return `Your plant "${plantName}" is feeling thirsty. Don't forget to water it to keep it healthy and happy!`;
  }, []);

  useEffect(() => {
    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!notificationStatusLoaded) {
        log(`Waiting for notification status to load.`);
        return;
      }

      if (!isNotificationsGranted) {
        log(`Notification is not permitted. Skipping notification scheduling.`);
        return;
      }

      {
        const allNotifications = await getAllScheduledNotificationsAsync();
        //  Delete notifications that plant does not exist anymore or has changed.
        for (const notification of allNotifications) {
          const userPlant = userPlantList.find((plantListItem) => {
            return plantListItem.file_id.toString() === notification.identifier;
          });
          if (!userPlant) {
            log(
              `Canceled scheduled notification with id: ${notification.identifier} because plant was removed.`
            );
            await cancelScheduledNotificationAsync(notification.identifier);
            continue;
          }

          const waterInterval = safeIntegerParse(
            userPlant.description.waterInterval
          );
          if (waterInterval === null) {
            log(
              `Canceled scheduled notification with id: ${notification.identifier} because of bad waterInterval`
            );
            await cancelScheduledNotificationAsync(notification.identifier);
            continue;
          }

          // @ts-ignore
          const {seconds, repeats, type} = notification.trigger;
          const {title} = notification.content;

          const waterIntervalInSeconds = DAY_IN_SECONDS * waterInterval;

          if (
            title !== generateNotificationTitle(userPlant.title) ||
            seconds !== waterIntervalInSeconds ||
            repeats !== true ||
            type !== 'timeInterval'
          ) {
            log(
              `Canceled scheduled notification with id: ${notification.identifier} because of changed trigger`
            );
            await cancelScheduledNotificationAsync(notification.identifier);
            continue;
          }
        }
      }

      {
        const allNotifications = await getAllScheduledNotificationsAsync();
        for (const userPlantItem of userPlantList) {
          const hasNotification = !!allNotifications.find(
            (notification) =>
              notification.identifier === userPlantItem.file_id.toString()
          );
          if (hasNotification) {
            continue;
          }
          const identifier = await scheduleNotificationAsync({
            identifier: userPlantItem.file_id.toString(),
            content: {
              title: generateNotificationTitle(userPlantItem.title),
            },
            trigger: {
              seconds: DAY_IN_SECONDS * userPlantItem.description.waterInterval,
              repeats: true,
            },
          });
          log(`Created scheduled notification with id: ${identifier}`);
        }
      }

      {
        const allNotifications = await getAllScheduledNotificationsAsync();
        log(
          `Notifications sync finished. active notifications: ${allNotifications.length}`
        );
      }
    })();
  }, [userPlantList, isNotificationsGranted, notificationStatusLoaded]);
  return {};
};
