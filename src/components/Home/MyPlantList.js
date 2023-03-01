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
import {checkPlantWaterNeed} from '../../hooks/useUserPlantWateringEvent';
import {safeIntegerParse} from '../../utils/safeIntegerParse';

const MyPlantList = ({navigation}) => {
  const [searchTextValue, setSearchTextValue] = useState('');
  const {userPlantList, wateringEventList} = useMainContext();
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
        renderItem={({item}) => {
          const plantWateringEvents = wateringEventList.filter(
            (x) => x.file_id === item.file_id
          );

          const needsWater = checkPlantWaterNeed({
            plantWateringEvents,
            waterInterval: safeIntegerParse(item.description.waterInterval),
          });

          return (
            <MyPlantListItem
              plant={item}
              navigation={navigation}
              needsWater={needsWater}
              needsNutrients={false}
              needsLight={false}
            />
          );
        }}
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
