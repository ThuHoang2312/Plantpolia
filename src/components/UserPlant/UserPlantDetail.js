import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Provider, Menu} from 'react-native-paper';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {spacing, fontSizes} from '../../utils/sizes';
import {useMedia} from '../../hooks/ApiHooks';
import UploadForm from '../UploadForm';
import Button from '../shared/Button';
import PlantOverview from './PlantOverview';
import PlantPhotoList from './PlantPhotoList';
// import UpdateFormOverlay from './UpdateFormOverlay';
import {uploadUrl} from '../../utils/variables';

const UserPlantDetail = ({plant, navigation}) => {
  // console.log('USER PLANT DETAIL : ', plant.title);
  // Get plant's description and its file id
  const plantDescription = JSON.parse(plant.description);
  const plantId = plant.file_id;
  console.log(plantId);
  const {image} = useContext(MainContext);

  // State to store user's choice on tab
  const [isOverview, setIsOverView] = useState(false);
  // console.log(isOverview);

  // Function to switch tab
  const switchTab = () => {
    setIsOverView(!isOverview);
  };

  // // MENU
  // const [visible, setVisible] = useState(false);
  // const openMenu = () => setVisible(!visible);

  // console.log(image);

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
                  onPress={() => console.log('ICON PRESSED')}
                />
              </View>
            </View>
          </View>
          {!isOverview ? (
            <View style={styles.contentContainer}>
              <ScrollView>
                <PlantOverview plantDescription={plantDescription} />
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
