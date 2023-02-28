import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {spacing} from '../utils/sizes';
import {useMainContext} from '../contexts/MainContext';
import {useSearch} from '../services/useSearch';
import {SearchBar} from '@rneui/themed';
import PlantNotFound from '../components/shared/PlantNotFound';
import PlantListItem from '../components/shared/PlantListItem';
import {uploadUrl} from '../utils/variables';
import React from 'react';

const AddPlant = ({navigation}) => {
  const {primaryPlantList, setImage, setUpload} = useMainContext();

  const {search} = useSearch();

  const searchResult = primaryPlantList.filter((obj) =>
    obj.title.toLowerCase().includes(search.value.toLowerCase())
  );

  searchResult.sort((a, b) => {
    const ta = a.title;
    const tb = b.title;

    if (ta < tb) {
      return -1;
    }
    if (ta > tb) {
      return 1;
    }

    return 0;
  });

  // searchResult.forEach((e) => {
  //   console.log(`${e.title}`);
  // });
  // console.log(searchResult.length);

  // if (load) {
  //   return <LoadingOverlay />;
  // }

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
            <PlantListItem
              plantDescription={item.description}
              imageUrl={item.thumbnails.w160}
              title={item.title}
              onPress={() => {
                setImage(`${uploadUrl}${item.thumbnails.w160}`);
                setUpload(false);
                navigation.navigate('Upload', {primaryPlant: item});
              }}
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

AddPlant.propTypes = {
  navigation: PropTypes.object,
};

export default AddPlant;
