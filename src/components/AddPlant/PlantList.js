import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {useMedia} from '../../hooks/ApiHooks';
import PlantListItem from '../shared/PlantListItem';

const PlantList = ({navigation, myFilesOnly = false}) => {
  const {prefixArray} = useMedia(myFilesOnly);
  // console.log('PLANT LIST: ', prefixArray);
  return (
    <FlatList
      data={prefixArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        // console.log('ITEM:', item),
        <PlantListItem
          plant={item}
          imageUrl={item.thumbnails.w160}
          title={item.title}
          navigation={navigation}
        />
      )}
    />
  );
};
PlantList.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default PlantList;
