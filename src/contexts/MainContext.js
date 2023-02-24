import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useClock} from '../utils/useClock';

/** @type {import('../types/MainContextModel').MainContextReactContext} */
export const MainContext = createContext(null);

// eslint-disable-next-line valid-jsdoc
/** @type {import('../types/MainContextModel').MainContextProviderFC} */
export const MainProvider = ({
  accessToken,
  expirationDate,
  userProfile,
  setAccessToken,
  setExpirationDate,
  setUserProfile,
  children,
}) => {
  const date = useClock();
  /** @type {import('../types/MainContextModel').UpdateUseStateModel} */
  const [update, setUpdate] = useState(true);

  /** @type {import('../types/MainContextModel').LastWaterUseStateModel} */
  const [lastWater, setLastWater] = useState('');

  /** @type {import('../types/MainContextModel').NotificationTimeUseStateModel} */
  const [notificationTime, setNotificationTime] = useState('');

  /** @type {import('../types/MainContextModel').ImageUseStateModel} */
  const [image, setImage] = useState('');

  /** @type {import('../types/MainContextModel').ImageSelectedUseStateModel} */
  const [imageSelected, setImageSelected] = useState(false);

  /** @type {import('../types/MainContextModel').TypeUseStateModel} */
  const [type, setType] = useState('image');

  /** @type {import('../types/MainContextModel').UploadUseStateModel} */
  const [upload, setUpload] = useState(false);

  const isExpired = !!accessToken && !!userProfile && expirationDate < date;
  const isLoggedIn = !isExpired && !!userProfile && !!accessToken;

  /** @type {import('../types/MainContextModel').MainContextModel} */
  const state = {
    ACCESS_TOKEN_AGE_IN_MS: 86_400_000, //  One Day
    isLoggedIn,
    isExpired,
    user: userProfile,
    setUser: setUserProfile,
    update,
    setUpdate,
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
    imageSelected,
    setImageSelected,
    token: accessToken,
    setToken: setAccessToken,
    expirationDate,
    setExpirationDate,
  };

  return <MainContext.Provider value={state}>{children}</MainContext.Provider>;
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
  expirationDate: PropTypes.number,
  accessToken: PropTypes.string,
};
