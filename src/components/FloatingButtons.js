import React from 'react';
import {FAB, Icon} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export const FloatingButtons = ({
  hideHomeIcon,
  hideWateringCanIcon,
  onHomeIconPress,
  onWateringCanIconPress,
}) => {
  return (
    <View style={styles.container}>
      {!hideWateringCanIcon && (
        <FAB
          color="white"
          style={{
            ...styles.fab,
            ...styles.shadow,
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
            ...styles.fab,
            ...styles.shadow,
          }}
          onPress={() => onHomeIconPress()}
        >
          <Icon style={{color: 'black'}} name="home" />
        </FAB>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fab: {
    margin: 5,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

FloatingButtons.propTypes = {
  hideHomeIcon: PropTypes.bool,
  hideWateringCanIcon: PropTypes.bool,
  onHomeIconPress: PropTypes.func,
  onWateringCanIconPress: PropTypes.func,
};
