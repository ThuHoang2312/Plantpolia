import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';

const EmptyPlantList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You haven&apos;t add any plant</Text>
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
  },
});

EmptyPlantList.propTypes = {};

export default EmptyPlantList;
