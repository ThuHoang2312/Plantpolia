import React from 'react';
import PropTypes from 'prop-types';
import {useWindowDimensions, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {FloatingButtons} from '../components/FloatingButtons';

const Home = ({navigation}) => {
  const {height} = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={{
        minHeight: height - bottomTabBarHeight,
      }}
    >
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
