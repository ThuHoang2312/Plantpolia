import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {uploadUrl} from '../../utils/variables';
import {MainContext} from '../../contexts/MainContext';

const PlantListItem = ({plant, imageUrl, title, navigation}) => {
  // console.log('PLANT LIST ITEM:', plant);
  // const imageUrl = uploadUrl + plant.thumbnails.w160;
  const {setImage, upload, setUpload} = useContext(MainContext);

  return (
    <RNEListItem
      onPress={() => {
        setImage(uploadUrl + imageUrl);
        setUpload(!upload);
        navigation.navigate('Upload', {plant: plant});
      }}
    >
      <Avatar rounded size="large" source={{uri: uploadUrl + imageUrl}} />
      <RNEListItem.Content>
        <RNEListItem.Title style={styles.title}>{title}</RNEListItem.Title>
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
  },
});

PlantListItem.propTypes = {
  plant: PropTypes.object,
  navigation: PropTypes.object,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

export default PlantListItem;
