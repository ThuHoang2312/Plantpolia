import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native';
import {spacing, fontSizes} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import Button from './Button';

const PlantNotFound = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Plant not found</Text>
        <Text style={styles.text}>
          You can suggest this plant to be added. Please note that Plantpolia
          supports only houseplant right now.
        </Text>
      </View>
      <View style={styles.container}>
        <Button
          text="Suggest plant to be added"
          disabled={false}
          onPress={() => {
            navigation.navigate('SuggestPlant');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    marginVertical: spacing.md,
    fontWeight: 'bold',
    color: colors.primary700,
  },
  text: {
    color: colors.primary700,
    fontSize: fontSizes.md,
  },
});

PlantNotFound.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PlantNotFound;
