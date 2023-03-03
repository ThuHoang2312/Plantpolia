import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';

const PlantOverview = ({plantDescription}) => {
  return (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Other Names</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plantDescription.otherNames}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Plant location</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plantDescription.location}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Level</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plantDescription.difficulty}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Clean</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {plantDescription.cleaningInstruction}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Liquid Fertilizing</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {plantDescription.fertilizerInstruction}
          </Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  labelContainer: {
    width: '50%',
  },
  textContainer: {
    width: '50%',
  },
  label: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },
  text: {
    marginHorizontal: spacing.md,
    fontSize: fontSizes.md,
    color: colors.primary800,
    marginVertical: spacing.sm,
  },
});

PlantOverview.propTypes = {
  plantDescription: PropTypes.object,
};
export default PlantOverview;
