import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';
import {colors} from '../../utils/colors';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import Button from './Button';

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button text="Okay" disabled={false} onPress={onConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.primary50,
  },
  text: {
    color: colors.primary700,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontFamily: fontFamily.regular,
  },
  title: {
    color: colors.primary700,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    fontFamily: fontFamily.regular,
  },
});

ErrorOverlay.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default ErrorOverlay;
