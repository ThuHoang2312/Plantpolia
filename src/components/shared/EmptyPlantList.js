import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import LottieIcons from '../LottieIcons/LottieIcons';
import PropTypes from 'prop-types';

const EmptyPlantList = ({isLoading}) => {
  return (
    <View style={styles.container}>
      {!isLoading && (
        <Text style={styles.title}>Start adding your plants!</Text>
      )}
      <LottieIcons iconName="WalkingPlant" focused autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    marginVertical: spacing.md,
    fontWeight: 'bold',
    color: colors.primary700,
    fontFamily: fontFamily.regular,
    marginBottom: 300,
  },
});

EmptyPlantList.propTypes = {
  isLoading: PropTypes.bool,
};

export default EmptyPlantList;
