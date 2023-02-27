import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from '@rneui/themed';
import {uploadUrl} from '../../utils/variables';
import {colors} from '../../utils/colors';
import {spacing} from '../../utils/sizes';

export const PlantPhotoListItem = ({imageUrl, title, description, date}) => {
  if (description === 'undefined') {
    description = 'No note';
  }
  // Convert time_add string to date
  date = Date.parse(date);
  let timeAdd = new Date(date);
  timeAdd = timeAdd.toDateString();

  // console.log(width);

  // console.log(timeAdd);

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{title}</Card.Title>
      <Card.Image source={{uri: uploadUrl + imageUrl}} style={styles.image} />
      <Card.Title style={styles.text}>{description}</Card.Title>
      <Card.Title style={styles.text}>{timeAdd}</Card.Title>
    </Card>
  );
};

const width = Dimensions.get('window').width - spacing.xxxl;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: width / 2,
  },

  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    color: colors.primary700,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },

  text: {
    color: colors.primary700,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
});

PlantPhotoListItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
};
