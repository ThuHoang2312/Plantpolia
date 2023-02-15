import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, setUser} = React.useContext(MainContext);
  return (
    <Button
      title="Logout!"
      onPress={async () => {
        console.log('Loggin out');
        setUser({});
        setIsLoggedIn(false);
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.warn('clearing AsyncStorage failed', error);
        }
      }}
    />
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
