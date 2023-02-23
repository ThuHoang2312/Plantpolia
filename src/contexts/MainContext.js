import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext({});

const MainProvider = (props) => {
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

export {MainContext, MainProvider};
