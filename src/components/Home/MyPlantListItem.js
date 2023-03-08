import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {fontFamily, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';
import {StatusChip} from '../StatusChip';

/** @type {import('../../types/TypedComponents').MyPlantListItem} */
export const MyPlantListItem = ({
  plant,
  navigation,
  needsWater,
  needsNutrients,
  needsLight,
}) => {
  // console.log('PLANT LIST ITEM:', plant);
  const imageUrl = plant.thumbnails.w160;
  const description = plant.description;

  /** @type {import('../../types/BaseModels').ChipModelList} */
  const chips = [
    {
      title: needsWater ? 'dehydrated' : 'watered',
      status: needsWater ? 'alert' : 'normal',
      disabled: false,
    },
    {
      title: needsLight ? 'Needs Sunlight' : 'Enough light',
      status: needsLight ? 'info' : 'normal',
      disabled: true,
    },
    {
      title: needsNutrients ? 'Needs Nutrients' : 'HEALTHY SOIL',
      status: needsNutrients ? 'info' : 'normal',
      disabled: true,
    },
  ];

  return (
    <RNEListItem
      style={{marginVertical: spacing.md}}
      onPress={() => {
        navigation.navigate('PlantDetail', {plant: plant});
      }}
    >
      <Avatar
        size="large"
        source={{uri: uploadUrl + imageUrl}}
        avatarStyle={styles.avatar}
      />
      <RNEListItem.Content style={styles.content}>
        <RNEListItem.Title style={styles.title}>
          {plant.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle style={styles.comment}>
          {description.otherNames}
        </RNEListItem.Subtitle>
        <View style={styles.statusContainer}>
          {(chips ?? []).map(({title, status, disabled}, index) => (
            <StatusChip
              key={[title, status, index].join()}
              disabled={disabled}
              status={status}
              title={String(title).toUpperCase()}
            />
          ))}
        </View>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: spacing.sm,
    marginVertical: spacing.sm,
  },
  avatar: {
    borderRadius: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.primary700,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },
  comment: {
    fontFamily: fontFamily.regular,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
  },
  location: {
    color: colors.primary100,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm / 2,
  },
});

MyPlantListItem.propTypes = {
  // @ts-ignore
  plant: PropTypes.object,
  needsWater: PropTypes.bool,
  needsNutrients: PropTypes.bool,
  needsLight: PropTypes.bool,
  navigation: PropTypes.object,
};

export default MyPlantListItem;
