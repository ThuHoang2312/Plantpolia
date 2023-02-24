import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

/** @type {import('../types/MainContextModel').MainContextReactContext} */
export const MainContext = createContext(null);

export const MainProvider = (props) => {
  /** @type {import('../types/MainContextModel').IsLoggedInUseStateModel} */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** @type {import('../types/MainContextModel').UserUseStateModel} */
  const [user, setUser] = useState(null);

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

  /** @type {import('../types/MainContextModel').TokenUseStateModel} */
  const [token, setToken] = React.useState('token');

  /** @type {import('../types/MainContextModel').MainContextModel} */
  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
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
    token,
    setToken,
  };

  return (
    <MainContext.Provider value={state}>{props.children}</MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);

  return context;
};

MainProvider.propTypes = {
  children: PropTypes.node,
};
