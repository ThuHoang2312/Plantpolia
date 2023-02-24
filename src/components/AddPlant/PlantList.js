import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import {useMedia} from '../../hooks/ApiHooks';
import PlantListItem from '../shared/PlantListItem';
import {colors} from '../../utils/colors';
import {useSearch} from '../../services/useSearch';
import PlantNotFound from '../shared/PlantNotFound';
import LoadingOverlay from '../shared/LoadingOverlay';
import {spacing} from '../../utils/sizes';

const PlantList = ({navigation}) => {
  const {prefixArray, load} = useMedia(false);

  const {search} = useSearch();

  const searchResult = prefixArray.filter((obj) =>
    obj.title.toLowerCase().includes(search.value.toLowerCase())
  );
  console.log(searchResult.length);

  if (load) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <SearchBar
        lightTheme
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        inputStyle={{color: colors.primary700}}
        placeholder="Search for plant ..."
        onChangeText={search.update}
        value={search.value}
      />
      {searchResult.length === 0 ? (
        <PlantNotFound navigation={navigation} isUserList={false} />
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

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.background,
    borderColor: colors.background,
    height: spacing.xxl,
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: colors.primary50,
  },
});

PlantList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PlantList;
