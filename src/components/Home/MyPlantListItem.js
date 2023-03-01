import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';
import {MainContext} from '../../contexts/MainContext';

const MyPlantListItem = ({plant, navigation}) => {
  // console.log('PLANT LIST ITEM:', plant);
  const imageUrl = plant.thumbnails.w160;
  const description = plant.description;
  const {setImage, setUpload} = useContext(MainContext);
  // console.log('ITEM UPLOAD: ', upload);

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
        size="xlarge"
        source={{uri: uploadUrl + imageUrl}}
        avatarStyle={styles.avatar}
      />
      <RNEListItem.Content style={styles.content}>
        <RNEListItem.Title style={styles.title}>
          {plant.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle>{description.otherNames}</RNEListItem.Subtitle>
        <View style={styles.statusContainer}>
          <View style={styles.locationContainer}>
            <RNEListItem.Subtitle style={styles.location}>
              {description.plantLocation}
            </RNEListItem.Subtitle>
          </View>
          {/* TODO: Change style when have data */}
          <View style={styles.waterContainer}>
            <RNEListItem.Subtitle style={styles.waterDone}>
              Water
            </RNEListItem.Subtitle>
          </View>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  waterContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
    // marginVertical: spacing.sm,
  },

  locationContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
    marginVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  location: {
    color: colors.primary100,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm / 2,
  },
  waterDone: {
    color: colors.primary100,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm / 2,
    textAlign: 'center',
  },
});

MyPlantListItem.propTypes = {
  plant: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyPlantListItem;
