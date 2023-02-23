import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text} from 'react-native';
import {SearchBar} from '@rneui/themed';
import {useMedia} from '../../hooks/ApiHooks';
import PlantListItem from '../shared/PlantListItem';
import {colors} from '../../utils/colors';
import {useSearch} from '../../services/useSearch';

const PlantList = ({navigation}) => {
  const {prefixArray} = useMedia(false);

  const {search} = useSearch();

  const searchResult = prefixArray.filter((obj) =>
    obj.title.toLowerCase().includes(search.value.toLowerCase())
  );
  console.log(searchResult.length);

  return (
    <>
      <SearchBar
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={{
          backgroundColor: colors.primary50,
        }}
        inputContainerStyle={{backgroundColor: colors.primary50}}
        inputStyle={{color: colors.primary700}}
        placeholder="Search for plant ..."
        onChangeText={search.update}
        value={search.value}
      />
      {searchResult.length === 0 ? (
        <Text> Sorry, no plant was found</Text>
      ) : (
        <FlatList
          data={searchResult}
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
      )}
    </>
  );
};
PlantList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PlantList;
