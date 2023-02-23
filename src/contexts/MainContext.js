import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

/** @type {import('../types/MainContextModel').MainContextReactContext} */
export const MainContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(true);
  const [lastWater, setLastWater] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [image, setImage] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const [upload, setUpload] = useState(false);
  const [token, setToken] = React.useState('token');

  return (
    <MainContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export const useMainContext = () => {
  const context = useContext(MainContext);

  return context;
};
