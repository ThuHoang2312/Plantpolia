import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';
import {MainContext} from '../../contexts/MainContext';

const MyPlantListItem = ({plant, imageUrl, title, description, navigation}) => {
  // console.log('PLANT LIST ITEM:', plant);
  // const imageUrl = uploadUrl + plant.thumbnails.w160;
  const {setImage, setUpload} = useContext(MainContext);
  // console.log('ITEM UPLOAD: ', upload);
  const plantDescription = JSON.parse(description);

  return (
    <RNEListItem
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
        <RNEListItem.Title style={styles.title}>{title}</RNEListItem.Title>
        <RNEListItem.Title>{plantDescription.otherNames}</RNEListItem.Title>
        <View style={styles.statusContainer}>
          <View style={styles.levelContainer}>
            <RNEListItem.Title style={styles.level}>
              {plantDescription.level}
            </RNEListItem.Title>
          </View>
          {/* TODO: Change style when have data */}
          <View style={styles.waterContainer}>
            <RNEListItem.Title style={styles.level}>Water</RNEListItem.Title>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  waterContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
    marginVertical: spacing.sm,
  },

  levelContainer: {
    backgroundColor: colors.primary700,
    borderRadius: spacing.sm,
    marginVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  level: {
    color: colors.primary100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm / 2,
  },
});

MyPlantListItem.propTypes = {
  plant: PropTypes.object,
  navigation: PropTypes.object,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default MyPlantListItem;
