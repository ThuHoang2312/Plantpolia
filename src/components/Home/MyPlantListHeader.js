import React from 'react';
import {StyleSheet, View} from 'react-native';
import Welcome from './Welcome';
import {colors} from '../../utils/colors';
import {SearchBar} from '@rneui/themed';
import {fontFamily, spacing} from '../../utils/sizes';
import PropTypes from 'prop-types';
import {checkPlantWaterNeed} from '../../hooks/useUserPlantWateringEvent';
import {safeIntegerParse} from '../../utils/safeIntegerParse';

const MyPlantListHeader = ({
  searchTextValue,
  onChangeSearchText,
  userPlantList,
  wateringEventList,
}) => {
  const dehydratedUserPlants = userPlantList.filter((userPlant) => {
    const plantWateringEvents = wateringEventList.filter(
      (x) => x.file_id === userPlant.file_id
    );
    return checkPlantWaterNeed({
      plantWateringEvents,
      waterInterval: safeIntegerParse(userPlant.description.waterInterval),
    });
  });
  const hydratedUserPlants = userPlantList.filter((userPlant) => {
    return !dehydratedUserPlants.includes(userPlant);
  });

  return (
    <View style={styles.container}>
      <Welcome
        hydratedUserPlants={hydratedUserPlants}
        dehydratedUserPlants={dehydratedUserPlants}
      />

      <SearchBar
        autoCapitalize="none"
        autoCorrect={false}
        lightTheme
        containerStyle={styles.searchBox}
        inputContainerStyle={styles.searchInput}
        inputStyle={{color: colors.primary700}}
        placeholder="Search for plant ..."
        onChangeText={onChangeSearchText}
        value={searchTextValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    display: 'flex',
  },
  searchBox: {
    backgroundColor: colors.primary50,
    height: spacing.xxl,
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  searchInput: {
    fontFamily: fontFamily.regular,
    backgroundColor: colors.primary50,
    height: spacing.xxl,
  },
});
MyPlantListHeader.propTypes = {
  searchTextValue: PropTypes.string,
  onChangeSearchText: PropTypes.func,
  userPlantList: PropTypes.array,
  wateringEventList: PropTypes.array,
};

export default MyPlantListHeader;
