import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Overlay, Text} from '@rneui/themed';
import {colors} from '../../utils/colors';
import {fontFamily, spacing} from '../../utils/sizes';
import PlantOverview from './PlantOverview';
import PlantPhotoList from './PlantPhotoList';
import {ConfigOverlay} from './ConfigOverlay';
import {createPlantWateringEventName} from '../../utils/variables';
import {useApi} from '../../hooks/ApiHooks';
import {useMainContext} from '../../contexts/MainContext';
import {showToast} from '../../utils/Toast';
import {useLogger} from '../../services/useLogger';

const UserPlantDetail = ({plant, navigation}) => {
  const {log} = useLogger('UserPlantDetail');

  const {postCommentByMediaId} = useApi();
  const {token, setWateringEventListNeedsHydration} = useMainContext();
  // Get plant's description and its file id
  const plantId = plant.file_id;

  // State to store user's choice on tab
  const [activeTab, setActiveTab] = useState('overview');

  // Overlay for modify plant
  const [configVisible, setConfigVisible] = useState(false);
  const toggleConfig = () => {
    setConfigVisible(!configVisible);
  };

  // Edit tab
  // const headerPressHandler = () => {
  //   console.log('PRESS ME');
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={toggleConfig}>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, toggleConfig]);

  // Submit the config form

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          disabled={activeTab === 'overview'}
          title="Overview"
          containerStyle={styles.tabButtonContainer}
          buttonStyle={styles.tabButton}
          disabledStyle={styles.tabButtonDisabled}
          titleStyle={styles.tabButtonTitle}
          disabledTitleStyle={styles.tabButtonDisabledTitle}
          onPress={() => setActiveTab('overview')}
        />

        <Button
          disabled={activeTab === 'photos'}
          title="Photos & Notes"
          containerStyle={styles.tabButtonContainer}
          buttonStyle={styles.tabButton}
          disabledStyle={styles.tabButtonDisabled}
          titleStyle={styles.tabButtonTitle}
          disabledTitleStyle={styles.tabButtonDisabledTitle}
          onPress={() => setActiveTab('photos')}
        />
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.menuContainer}>
          <Overlay
            overlayStyle={styles.overlay}
            isVisible={configVisible}
            onBackdropPress={toggleConfig}
          >
            <ConfigOverlay
              fileId={plantId}
              name={plant.title}
              plant={plant}
              closeOverlay={toggleConfig}
              navigation={navigation}
            />
          </Overlay>
        </View>
      </View>

      {activeTab === 'overview' && <PlantOverview plant={plant} />}

      {activeTab === 'photos' && (
        <PlantPhotoList
          fileId={plantId}
          title={plant.title}
          navigation={navigation}
        />
      )}
      <Button
        title="I watered this plant"
        buttonStyle={{
          paddingVertical: 30,
          backgroundColor: colors.primary500,
        }}
        titleStyle={{
          fontFamily: fontFamily.regular,
        }}
        onPress={async () => {
          const [result, error] = await postCommentByMediaId(
            plant.file_id,
            createPlantWateringEventName(Date.now()),
            token
          );
          log(result);

          if (error) {
            showToast(error.message);
          }
          setWateringEventListNeedsHydration(true);
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  overlay: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    height: '90%',
    width: '90%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  tabButtonContainer: {
    flex: 1,
    borderRadius: 0,
  },
  tabButton: {
    borderRadius: 0,
    backgroundColor: colors.primary600,
  },
  tabButtonDisabled: {
    backgroundColor: colors.primary800,
  },
  tabButtonTitle: {
    color: 'white',
  },
  tabButtonDisabledTitle: {
    color: 'white',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    color: colors.primary700,
    fontSize: spacing.md,
    fontWeight: 'bold',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
});

UserPlantDetail.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  plant: PropTypes.object,
};

export default UserPlantDetail;
