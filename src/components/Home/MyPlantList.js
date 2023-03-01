import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import MyPlantListItem from './MyPlantListItem';
import {colors} from '../../utils/colors';
import PlantNotFound from '../shared/PlantNotFound';
import {spacing} from '../../utils/sizes';
import {useMainContext} from '../../contexts/MainContext';
import MyPlantListHeader from './MyPlantListHeader';
import EmptyPlantList from '../shared/EmptyPlantList';

const MyPlantList = ({navigation}) => {
  const [searchTextValue, setSearchTextValue] = useState('');
  const {userPlantList} = useMainContext();

  const userTypedInSearchBar = searchTextValue !== '';

  const filteredUserPlantList = userPlantList.filter((obj) =>
    userTypedInSearchBar
      ? obj.title.toLowerCase().includes(searchTextValue.toLowerCase())
      : true
  );

  const onChangeSearchText = useCallback((value) => {
    setSearchTextValue(value);
  }, []);

  const ListHeaderComponent = (
    <MyPlantListHeader
      searchTextValue={searchTextValue}
      onChangeSearchText={onChangeSearchText}
    />
  );
  const ListEmptyComponent = userTypedInSearchBar ? (
    <PlantNotFound navigation={navigation} isUserList={true} />
  ) : (
    <EmptyPlantList />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUserPlantList}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <MyPlantListItem plant={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 100,
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
};

export default MyPlantList;
