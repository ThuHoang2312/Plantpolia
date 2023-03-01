import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Avatar, Chip, ListItem as RNEListItem} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';
import {MainContext} from '../../contexts/MainContext';

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
  const {setImage, setUpload} = useContext(MainContext);

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
        setImage(uploadUrl + imageUrl);
        setUpload(false);
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
        <RNEListItem.Subtitle>{description.otherNames}</RNEListItem.Subtitle>
        <View style={styles.statusContainer}>
          {(chips ?? []).map(({title, status, disabled}, index) => (
            <Chip
              disabled={disabled}
              key={[title, status, index].join()}
              buttonStyle={{
                ...styles.statusChipButton,
                ...(status === 'info' ? styles.statusChipInfoButton : {}),
                ...(status === 'normal' ? styles.statusChipNormalButton : {}),
                ...(status === 'alert' ? styles.statusChipAlertButton : {}),
              }}
              containerStyle={styles.statusChipContainer}
              titleStyle={styles.statusChipTitle}
              style={styles.statusChip}
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
    color: colors.primary700,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusChipContainer: {
    borderRadius: 0,
    margin: spacing.sm / 4,
  },
  statusChipTitle: {
    fontWeight: '400',
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
