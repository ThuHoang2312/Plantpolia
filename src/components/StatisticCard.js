import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';

export const StatisticCard = ({number, isHydrated}) => {
  return (
    <>
      {!isHydrated ? (
        <View style={styles.container}>
          <View style={styles.dehydrateWrapper}>
            <Text style={styles.dehydrate}>{number}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>NEED WATER</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.hydrateWrapper}>
            <Text style={styles.hydrate}>{number}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>IS HEALTHY</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    flexDirection: 'row',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: colors.primary300,
    borderWidth: spacing.sm / 4,
    padding: spacing.sm,
    borderRadius: spacing.sm,
  },
  dehydrate: {
    color: colors.primary50,
    fontSize: fontSizes.lg,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
    fontFamily: fontFamily.regular,
  },
  hydrate: {
    color: colors.primary50,
    fontSize: fontSizes.lg,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
    fontFamily: fontFamily.regular,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  hydrateWrapper: {
    backgroundColor: colors.hydrated,
    borderRadius: spacing.sm / 2,
  },
  dehydrateWrapper: {
    backgroundColor: colors.dehydrated,
    borderRadius: spacing.sm / 2,
  },
  textWrapper: {
    justifyContent: 'center',
    marginHorizontal: spacing.sm / 2,
  },
});

StatisticCard.propTypes = {
  number: PropTypes.number,
  isHydrated: PropTypes.bool,
};
