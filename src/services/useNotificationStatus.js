import {useCallback, useEffect, useState} from 'react';
import {getPermissionsAsync, requestPermissionsAsync} from 'expo-notifications';

export const useNotificationStatus = () => {
  const [currentStatus, setCurrentStatus] = useState('undetermined');

  const requestNotificationPermissions = useCallback(() => {
    (async () => {
      const {status} = await requestPermissionsAsync();
      setCurrentStatus(status);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const {status} = await getPermissionsAsync();
      setCurrentStatus(status);
    })();
  }, []);

  return {
    isNotificationsGranted: currentStatus === 'granted',
    canAskForNotificationPermission: currentStatus !== 'denied',
    requestNotificationPermissions,
  };
};
