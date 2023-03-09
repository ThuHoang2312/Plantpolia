import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {spacing} from '../../utils/sizes';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary700} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.primary50,
  },
});
