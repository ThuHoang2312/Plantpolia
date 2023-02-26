import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';

const Input = ({text, ...inputConfig}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoCapitalize="none"
        placeholderStyle={styles.placeholder}
        style={styles.input}
        {...inputConfig}
        placeholder={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  input: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    padding: spacing.sm,
    backgroundColor: colors.primary50,
    borderRadius: spacing.sm,
    height: spacing.xxl,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: colors.primary100,
    borderWidth: spacing.sm / 4,
  },
  placeholder: {
    fontSize: fontSizes.md,
    color: colors.primary700,
  },
});

Input.propTypes = {
  text: PropTypes.string,
  inputConfig: PropTypes.object,
};

export default Input;
