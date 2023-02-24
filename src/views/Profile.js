import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';

const Profile = ({navigation}) => {
  const {setUser, setExpirationDate, setToken} = React.useContext(MainContext);
  return (
    <Button
      title="Logout!"
      onPress={async () => {
        console.log('Loggin out');
        setUser(null);
        setExpirationDate(null);
        setToken(null);
      }}
    />
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
