import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Overlay} from '@rneui/themed';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {spacing, fontSizes} from '../../utils/sizes';
import Button from '../shared/Button';
import PlantOverview from './PlantOverview';
import PlantPhotoList from './PlantPhotoList';
import {ConfigOverlay} from './ConfigOverlay';

const UserPlantDetail = ({plant, navigation}) => {
  console.log('USER DETAIL PLANT:', plant);
  // Get plant's description and its file id
  const description = JSON.parse(plant.description);
  console.log('TYPE:', typeof description);
  const plantId = plant.file_id;
  // console.log(plantId);
  const {image} = useContext(MainContext);

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

  // Submit the config form

  return (
    <>
      <>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: image}}
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
                <IconButton
                  icon="cog"
                  size={30}
                  iconColor={colors.primary800}
                  onPress={toggleConfig}
                />
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
