import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {useMainContext} from '../contexts/MainContext';
import {Button, Text} from '@rneui/themed';

export const Intro = ({navigation}) => {
  const {promoStatus, setPromoStatus} = useMainContext();
  return (
    <View>
      <Text>I AM THE PROMO</Text>
      <Button
        onPress={() => {
          setPromoStatus('VIEWED');
          navigation.navigate('Login');
        }}
      >
        Skip
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

Intro.propTypes = {
  navigation: PropTypes.object,
};
