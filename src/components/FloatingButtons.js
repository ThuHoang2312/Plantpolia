import React from 'react';
import {FAB, Icon, Image} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {useAssets} from 'expo-asset';
import {colors} from '../utils/colors';

export const FloatingButtons = ({
  hideHomeIcon,
  hideWateringCanIcon,
  onHomeIconPress,
  onWateringCanIconPress,
}) => {
  const [assets] = useAssets([require('../../assets/watering-can-white.png')]);

  return (
    <View style={styles.container}>
      {!hideWateringCanIcon && (
        <FAB
          color={colors.primary500}
          style={{
            ...styles.fab,
            ...styles.shadow,
          }}
          onPress={() => {
            onWateringCanIconPress();
          }}
        >
          {assets && (
            <Image
              source={{uri: assets[0].localUri}}
              style={{
                width: 45,
                height: 45,
                resizeMode: 'contain',
              }}
            />
          )}
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
