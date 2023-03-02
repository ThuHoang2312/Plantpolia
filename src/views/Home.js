import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {FloatingButtons} from '../components/FloatingButtons';
import MyPlantList from '../components/Home/MyPlantList';

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyPlantList navigation={navigation} />
      <FloatingButtons
        onHomeIconPress={() => {}}
        onWateringCanIconPress={() => {
          navigation.navigate('WateringProcess');
        }}
      />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
