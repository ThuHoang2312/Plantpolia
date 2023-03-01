import React from 'react';
import {StyleSheet, View} from 'react-native';
import Welcome from './Welcome';
import {colors} from '../../utils/colors';
import {SearchBar} from '@rneui/themed';
import {spacing} from '../../utils/sizes';
import PropTypes from 'prop-types';

const MyPlantListHeader = ({searchTextValue, onChangeSearchText}) => {
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
  },
  searchBox: {
    backgroundColor: colors.primary50,
    height: spacing.xxl,
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  searchInput: {backgroundColor: colors.primary50},
});
MyPlantListHeader.propTypes = {
  searchTextValue: PropTypes.string,
  onChangeSearchText: PropTypes.func,
};

export default MyPlantListHeader;
