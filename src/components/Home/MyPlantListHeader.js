import React from 'react';
import {StyleSheet, View} from 'react-native';
import Welcome from './Welcome';
import {colors} from '../../utils/colors';
import {SearchBar} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import PropTypes from 'prop-types';
import {StatusChip} from '../StatusChip';
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
      <Welcome />
      <View style={styles.statisticsContainer}>
        <StatusChip
          status="normal"
          style={styles.statusChipStyle}
          buttonStyle={styles.statusChipButtonStyle}
          titleStyle={styles.statusChipTitleStyle}
          title={`${hydratedUserPlants.length} Healthy`}
        />
        <StatusChip
          style={styles.statusChipStyle}
          buttonStyle={styles.statusChipButtonStyle}
          status={dehydratedUserPlants.length === 0 ? 'normal' : 'alert'}
          titleStyle={styles.statusChipTitleStyle}
          title={`${dehydratedUserPlants.length} Dehydrated`}
        />
        <StatusChip
          disabled
          status="info"
          style={styles.statusChipStyle}
          buttonStyle={styles.statusChipButtonStyle}
          titleStyle={styles.statusChipTitleStyle}
          title="0 Needs Nutrients"
        />
      </View>
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
    backgroundColor: colors.primary50,
    height: spacing.xxl,
  },
  statisticsContainer: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  statusChipStyle: {},
  statusChipButtonStyle: {
    padding: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  statusChipTitleStyle: {
    fontSize: 16,
    textAlign: 'left',
    flex: 1,
  },
});
MyPlantListHeader.propTypes = {
  searchTextValue: PropTypes.string,
  onChangeSearchText: PropTypes.func,
  userPlantList: PropTypes.array,
  wateringEventList: PropTypes.array,
};

export default MyPlantListHeader;
