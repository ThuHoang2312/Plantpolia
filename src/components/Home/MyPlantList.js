import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, StyleSheet} from 'react-native';
import {useMedia} from '../../hooks/ApiHooks';
import MyPlantListItem from './MyPlantListItem';
import {MainContext} from '../../contexts/MainContext';
import Welcome from './Welcome';
import {colors} from '../../utils/colors';
import {useSearch} from '../../services/useSearch';
import {SearchBar} from '@rneui/themed';
import LoadingOverlay from '../shared/LoadingOverlay';
import PlantNotFound from '../shared/PlantNotFound';
import {spacing} from '../../utils/sizes';

const MyPlantList = ({navigation, myFilesOnly}) => {
  const {user} = useContext(MainContext);
  // console.log('USER : ', user);
  const {plantArray, load} = useMedia(myFilesOnly, user.user_id);
  // console.log('PLANT LIST: ', plantArray);
  const {search} = useSearch();

  let searchResult = [];
  if (search) {
    searchResult = plantArray.filter((obj) =>
      obj.title.toLowerCase().includes(search.value.toLowerCase())
    );
    console.log(searchResult.length);
  }

  if (load) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <Welcome />
      <SearchBar
        autoCapitalize="none"
        autoCorrect={false}
        lightTheme
        containerStyle={styles.searchBox}
        inputContainerStyle={styles.searchInput}
        inputStyle={{color: colors.primary700}}
        placeholder="Search for plant ..."
        onChangeText={search.update}
        value={search.value}
      />
      {search && searchResult.length != 0 ? (
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            // console.log('ITEM:', item),
            <MyPlantListItem plant={item} navigation={navigation} />
          )}
        />
      ) : (
        <PlantNotFound navigation={navigation} isUserList={true} />
      )}
      {!search && (
        <FlatList
          data={plantArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            // console.log('ITEM:', item),
            <MyPlantListItem
              plant={item}
              imageUrl={item.thumbnails.w160}
              title={item.title}
              description={item.description}
              navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBox: {
    backgroundColor: colors.primary50,
    height: spacing.xxl,
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  searchInput: {backgroundColor: colors.primary50},
});
MyPlantList.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default MyPlantList;
