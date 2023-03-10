import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {fontFamily, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';

const PlantListItem = ({plantDescription, imageUrl, title, onPress}) => {
  return (
    <RNEListItem onPress={onPress}>
      <Avatar rounded size="large" source={{uri: uploadUrl + imageUrl}} />
      <RNEListItem.Content>
        <RNEListItem.Title style={styles.title}>{title}</RNEListItem.Title>
        <View style={styles.levelContainer}>
          <RNEListItem.Subtitle style={styles.subtitle}>
            {plantDescription.difficulty}
          </RNEListItem.Subtitle>
        </View>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.primary700,
    fontWeight: 'bold',
    marginLeft: spacing.xxl,
    fontFamily: fontFamily.regular,
  },
  levelContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
    marginVertical: spacing.sm,
    marginLeft: spacing.xxl,
  },
  subtitle: {
    color: colors.primary50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm / 4,
    fontFamily: fontFamily.regular,
  },
});

PlantListItem.propTypes = {
  onPress: PropTypes.func,
  plantDescription: PropTypes.object,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

export default PlantListItem;
