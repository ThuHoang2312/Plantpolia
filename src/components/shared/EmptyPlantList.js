import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import LottieIcons from '../LottieIcons/LottieIcons';

const EmptyPlantList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start adding your plants!</Text>
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

EmptyPlantList.propTypes = {};

export default EmptyPlantList;
