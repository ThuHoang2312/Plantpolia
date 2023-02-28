import React from 'react';
import PropTypes from 'prop-types';
import {useWindowDimensions, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {FloatingButtons} from '../components/FloatingButtons';
import MyPlantList from '../components/Home/MyPlantList';

const Home = ({navigation}) => {
  const {height} = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={{
        minHeight: height - bottomTabBarHeight,
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
