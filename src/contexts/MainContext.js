import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useClock} from '../utils/useClock';
import {usePrimaryPlantHooks} from '../hooks/usePrimaryPlantHooks';
import {useUserPlantHooks} from '../hooks/useUserPlantHooks';
import {useNotification} from '../services/useNotification';
import {useUserPlantWateringEvent} from '../hooks/useUserPlantWateringEvent';
import {DAY_IN_MILLI_SECONDS} from '../utils/variables';

/** @type {import('../types/TypedMainContext').MainContextReactContext} */
export const MainContext = createContext(null);

// eslint-disable-next-line valid-jsdoc
/** @type {import('../types/TypedMainContext').MainContextProviderFC} */
export const MainProvider = ({
  accessToken,
  expirationDate,
  userProfile,
  defaultPrimaryPlantList,
  defaultUserPlantList,
  defaultWateringEventList,
  setAccessToken,
  setExpirationDate,
  setUserProfile,
  children,
}) => {
  const date = useClock();

  const {
    primaryPlantList,
    primaryPlantListLoading,
    setPrimaryPlantListNeedsHydration,
  } = usePrimaryPlantHooks({defaultPrimaryPlantList});

  const {userPlantList, userPlantListLoading, setUserPlantListNeedsHydration} =
    useUserPlantHooks({defaultUserPlantList, userProfile});

  useNotification({userPlantList});

  const {
    wateringEventList,
    setWateringEventListNeedsHydration,
    wateringEventListLoading,
  } = useUserPlantWateringEvent({
    userPlantList,
    defaultWateringEventList,
  });

  const [notificationTime, setNotificationTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('image');
  const [upload, setUpload] = useState(false);

  const isExpired = !!accessToken && !!userProfile && expirationDate < date;
  const isLoggedIn = !isExpired && !!userProfile && !!accessToken;

  return (
    <MainContext.Provider
      value={{
        ACCESS_TOKEN_AGE_IN_MS: DAY_IN_MILLI_SECONDS, //  One Day
        isLoggedIn,
        isExpired,
        user: userProfile,
        setUser: setUserProfile,
        notificationTime,
        setNotificationTime,
        location,
        setLocation,
        image,
        setImage,
        upload,
        setUpload,
        type,
        setType,
        token: accessToken,
        setToken: setAccessToken,
        expirationDate,
        setExpirationDate,

        primaryPlantList,
        primaryPlantListLoading,
        setPrimaryPlantListNeedsHydration,

        userPlantList,
        userPlantListLoading,
        setUserPlantListNeedsHydration,

        wateringEventList,
        setWateringEventListNeedsHydration,
        wateringEventListLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return useContext(MainContext);
};

MainProvider.propTypes = {
  children: PropTypes.node,
  setUserProfile: PropTypes.func,
  setExpirationDate: PropTypes.func,
  setAccessToken: PropTypes.func,
  userProfile: PropTypes.any,
  defaultPrimaryPlantList: PropTypes.array,
  defaultUserPlantList: PropTypes.array,
  defaultWateringEventList: PropTypes.array,
  expirationDate: PropTypes.number,
  accessToken: PropTypes.string,
};
