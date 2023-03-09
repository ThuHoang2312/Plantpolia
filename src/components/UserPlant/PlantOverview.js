import React from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';

const PlantOverview = ({plant}) => {
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: uploadUrl + plant.thumbnails.w640}}
          blurRadius={0.1}
        />
        <Text style={styles.title}>{plant.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Other Names</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plant.description.otherNames}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Plant location</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plant.description.location}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Level</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plant.description.difficulty}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Clean</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {plant.description.cleaningInstruction}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Liquid Fertilizing</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {plant.description.fertilizerInstruction}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  imageContainer: {
    maxHeight: 300,
  },
  image: {
    width: '100%',
    height: '65%',
    alignSelf: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    marginTop: spacing.sm,
    color: colors.primary700,
    marginVertical: spacing.sm,
    alignSelf: 'center',
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
  plant: PropTypes.object,
};
export default PlantOverview;
