import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Overlay} from '@rneui/themed';
import {colors} from '../../utils/colors';
import {fontSizes, spacing} from '../../utils/sizes';
import Button from '../shared/Button';
import PlantOverview from './PlantOverview';
import PlantPhotoList from './PlantPhotoList';
import {ConfigOverlay} from './ConfigOverlay';
import {uploadUrl} from '../../utils/variables';

const UserPlantDetail = ({plant, navigation}) => {
  // Get plant's description and its file id
  const description = plant.description;
  const plantId = plant.file_id;

  // State to store user's choice on tab
  const [isOverview, setIsOverView] = useState(false);
  // console.log(isOverview);

  // Function to switch tab
  const switchTab = () => {
    setIsOverView(!isOverview);
  };

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
    <>
      <>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: uploadUrl + plant.thumbnails.w640}}
              blurRadius={0.1}
            />
            <Text style={styles.title}>{plant.title}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                text="Overview"
                disabled={!isOverview}
                onPress={switchTab}
              />

              <Button
                text="Photos & Notes"
                onPress={switchTab}
                disabled={isOverview}
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
          </View>
          {!isOverview ? (
            <View style={styles.contentContainer}>
              <ScrollView>
                <PlantOverview plantDescription={description} />
              </ScrollView>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <View
                style={{
                  backgroundColor: colors.background,
                  width: '100%',
                  height: '100%',
                }}
              >
                <PlantPhotoList
                  fileId={plantId}
                  title={plant.title}
                  navigation={navigation}
                />
              </View>
            </View>
          )}
        </View>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    flex: 5,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 8,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '65%',
    alignSelf: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    marginTop: spacing.sm,
    color: colors.primary700,
    marginVertical: spacing.sm,
    alignSelf: 'center',
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
