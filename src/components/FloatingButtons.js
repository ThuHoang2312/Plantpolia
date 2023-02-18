import React from 'react';
import {FAB, Icon} from '@rneui/themed';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export const FloatingButtons = ({
  hideHomeIcon,
  hideWateringCanIcon,
  onHomeIconPress,
  onWateringCanIconPress,
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        right: 20,
        bottom: 100,
      }}
    >
      {!hideWateringCanIcon && (
        <FAB
          color="white"
          style={{
            margin: 10,
          }}
          onPress={() => {
            onWateringCanIconPress();
          }}
        >
          <Icon style={{color: 'black'}} name="arrow-right" />
        </FAB>
      )}
      {!hideHomeIcon && (
        <FAB
          color="white"
          style={{
            margin: 10,
          }}
          onPress={() => onHomeIconPress()}
        >
          <Icon style={{color: 'black'}} name="home" />
        </FAB>
      )}
    </View>
  );
};

FloatingButtons.propTypes = {
  hideHomeIcon: PropTypes.bool,
  hideWateringCanIcon: PropTypes.bool,
  onHomeIconPress: PropTypes.func,
  onWateringCanIconPress: PropTypes.func,
};
