import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import MyPlantListItem from './MyPlantListItem';
import {colors} from '../../utils/colors';
import PlantNotFound from '../shared/PlantNotFound';
import {useMainContext} from '../../contexts/MainContext';
import MyPlantListHeader from './MyPlantListHeader';
import EmptyPlantList from '../shared/EmptyPlantList';
import {checkPlantWaterNeed} from '../../hooks/useUserPlantWateringEvent';
import {safeIntegerParse} from '../../utils/safeIntegerParse';
import {FloatingButtons} from '../FloatingButtons';

const MyPlantList = ({navigation}) => {
  const [searchTextValue, setSearchTextValue] = useState('');
  const {
    userPlantList,
    wateringEventList,
    userPlantListLoading,
    wateringEventListLoading,
  } = useMainContext();

  const userTypedInSearchBar = searchTextValue !== '';

  // Filter the user plant list to get the search result
  const filteredUserPlantList = userPlantList.filter((obj) =>
    userTypedInSearchBar
      ? obj.title.toLowerCase().includes(searchTextValue.toLowerCase())
      : true
  );

  const filteredUserPlantListWithStatistics = filteredUserPlantList.map(
    (userPlant) => {
      const plantWateringEvents = wateringEventList.filter(
        (x) => x.file_id === userPlant.file_id
      );

      const needsWater = checkPlantWaterNeed({
        plantWateringEvents,
        waterInterval: safeIntegerParse(userPlant.description.waterInterval),
      });
      return {
        userPlant,
        needsWater,
      };
    }
  );

  // Set value to search
  const onChangeSearchText = useCallback((value) => {
    setSearchTextValue(value);
  }, []);

  const ListHeaderComponent = (
    <MyPlantListHeader
      searchTextValue={searchTextValue}
      onChangeSearchText={onChangeSearchText}
      userPlantList={userPlantList}
      wateringEventList={wateringEventList}
    />
  );

  // If user doesn't have any plant yet
  const ListEmptyComponent =
    userPlantListLoading || wateringEventListLoading ? (
      <EmptyPlantList isLoading />
    ) : userTypedInSearchBar ? (
      <PlantNotFound navigation={navigation} isUserList={true} />
    ) : (
      <EmptyPlantList />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUserPlantListWithStatistics}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          const {needsWater, userPlant} = item;
          return (
            <MyPlantListItem
              plant={userPlant}
              navigation={navigation}
              needsWater={needsWater}
              needsNutrients={false}
              needsLight={false}
            />
          );
        }}
      />
      <FloatingButtons
        enableWateringCanIcon={filteredUserPlantListWithStatistics.some(
          (x) => x.needsWater
        )}
        hideHomeIcon
        onHomeIconPress={() => {}}
        onWateringCanIconPress={() => {
          navigation.navigate('WateringProcess');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
MyPlantList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyPlantList;
