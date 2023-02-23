import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {fontSizes, spacing} from '../../utils/sizes';
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
    backgroundColor: colors.primary700,
  },
  text: {
    color: colors.primary50,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
});

ErrorOverlay.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default ErrorOverlay;
