import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useClock} from '../utils/useClock';
import {usePrimaryPlantHooks} from '../hooks/PrimaryPlantHooks';
import {useUserPlantHooks} from '../hooks/UserPlantHooks';

/** @type {import('../types/MainContextModel').MainContextReactContext} */
export const MainContext = createContext(null);

// eslint-disable-next-line valid-jsdoc
/** @type {import('../types/MainContextModel').MainContextProviderFC} */
export const MainProvider = ({
  accessToken,
  expirationDate,
  userProfile,
  defaultPrimaryPlantList,
  defaultUserPlantList,
  setAccessToken,
  setExpirationDate,
  setUserProfile,
  children,
}) => {
  const {
    primaryPlantList,
    primaryPlantListLoading,
    setPrimaryPlantListNeedsHydration,
  } = usePrimaryPlantHooks(defaultPrimaryPlantList);
  const {userPlantList, userPlantListLoading, setUserPlantListNeedsHydration} =
    useUserPlantHooks(defaultUserPlantList, userProfile);

  const date = useClock();
  const [lastWater, setLastWater] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('image');
  const [upload, setUpload] = useState(false);

  const isExpired = !!accessToken && !!userProfile && expirationDate < date;
  const isLoggedIn = !isExpired && !!userProfile && !!accessToken;

  return (
    <MainContext.Provider
      value={{
        ACCESS_TOKEN_AGE_IN_MS: 86_400_000, //  One Day
        isLoggedIn,
        isExpired,
        user: userProfile,
        setUser: setUserProfile,
        lastWater,
        setLastWater,
        notificationTime,
        setNotificationTime,
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);

  return context;
};

MainProvider.propTypes = {
  children: PropTypes.node,
  setUserProfile: PropTypes.func,
  setExpirationDate: PropTypes.func,
  setAccessToken: PropTypes.func,
  userProfile: PropTypes.any,
  defaultPrimaryPlantList: PropTypes.array,
  defaultUserPlantList: PropTypes.array,
  expirationDate: PropTypes.number,
  accessToken: PropTypes.string,
};
