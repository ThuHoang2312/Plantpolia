import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {spacing, fontSizes} from '../../utils/sizes';
import {colors} from '../../utils/colors';

const Button = ({text, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={disabled ? styles.buttonDisabled : styles.buttonEnabled}
      disabled={disabled}
    >
      <Text
        style={disabled ? styles.buttonTextDisabled : styles.buttonTextEnabled}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    width: '45%',
    backgroundColor: colors.primary700,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    width: '45%',
    backgroundColor: colors.primary50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    marginTop: spacing.sm,
  },
  buttonTextEnabled: {
    color: colors.primary50,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: colors.primary700,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
});

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
