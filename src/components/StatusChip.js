import {StyleSheet} from 'react-native';
import {fontFamily, spacing} from '../utils/sizes';
import {Chip} from '@rneui/themed';
import React from 'react';
import PropTypes from 'prop-types';

export const StatusChip = ({
  disabled,
  title,
  status,
  buttonStyle,
  disabledStyle,
  containerStyle,
  titleStyle,
  style,
}) => {
  return (
    <Chip
      disabled={disabled}
      buttonStyle={{
        ...styles.statusChipButton,
        ...(status === 'info' ? styles.statusChipInfoButton : {}),
        ...(status === 'normal' ? styles.statusChipNormalButton : {}),
        ...(status === 'alert' ? styles.statusChipAlertButton : {}),
        ...(buttonStyle ?? {}),
      }}
      containerStyle={{
        ...styles.statusChipContainer,
        ...(containerStyle ?? {}),
      }}
      titleStyle={{
        ...styles.statusChipTitle,
        ...(titleStyle ?? {}),
      }}
      disabledStyle={{
        ...styles.disabledStyle,
        ...(disabledStyle ?? {}),
      }}
      style={{
        ...styles.statusChip,
        ...(style ?? {}),
      }}
      title={String(title).toUpperCase()}
    />
  );
};

const styles = StyleSheet.create({
  statusChipContainer: {
    borderRadius: 0,
    margin: spacing.sm / 4,
  },
  statusChipTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  statusChipButton: {
    padding: spacing.sm / 4,
    borderRadius: spacing.sm / 2,
  },
  statusChipAlertButton: {
    backgroundColor: '#DC2626',
  },
  statusChipNormalButton: {
    backgroundColor: '#059669',
  },
  statusChipInfoButton: {
    backgroundColor: '#0284C7',
  },
  statusChip: {},
  disabledStyle: {},
});

StatusChip.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  buttonStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  viewStyle: PropTypes.object,
  style: PropTypes.object,
};
