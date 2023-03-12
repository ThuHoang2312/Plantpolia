import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import MyPlantList from '../components/Home/MyPlantList';

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyPlantList navigation={navigation} />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
