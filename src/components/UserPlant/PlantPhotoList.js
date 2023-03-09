import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Overlay} from '@rneui/themed';
import {colors} from '../../utils/colors';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {AddPlantPhotoForm} from '../shared/AddPlantPhotoForm';
import {PlantPhotoListItem} from './PlantPhotoListItem';
import {useUserPlantPhotoHooks} from '../../hooks/useUserPlantPhotoHooks';

const PlantPhotoList = ({title, fileId, navigation}) => {
  const {userPlantPhotoList, setUserPlantPhotoListNeedsHydration} =
    useUserPlantPhotoHooks(fileId);

  // Overlay state and function for photos and note tab
  const [visible, setVisible] = useState(false);
  const toggleOverlay = (needsHydration = false) => {
    setVisible(!visible);
    if (needsHydration) {
      setUserPlantPhotoListNeedsHydration(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconButton
          icon="image-plus"
          iconColor={colors.primary700}
          size={35}
          onPress={() => toggleOverlay(false)}
        />
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={() => toggleOverlay(false)}
        >
          <IconButton
            icon="close"
            iconColor={colors.primary700}
            size={35}
            onPress={() => toggleOverlay(false)}
          />
          <AddPlantPhotoForm
            title={title}
            fileId={fileId}
            closeForm={() => toggleOverlay(true)}
          />
        </Overlay>
      </View>
      <View style={styles.photoContainer}>
        {userPlantPhotoList.length === 0 ? (
          <Text style={styles.text}>You have not add any photos or notes</Text>
        ) : (
          <>
            <FlatList
              numColumns={2}
              data={userPlantPhotoList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <PlantPhotoListItem
                  description={item.description}
                  imageUrl={item.thumbnails.w160}
                  title={title}
                  date={item.time_added}
                  navigation={navigation}
                  fileId={item.file_id}
                />
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    height: '90%',
    width: '90%',
  },
  text: {
    fontFamily: fontFamily.bold,
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    fontSize: fontSizes.md,
    color: colors.primary700,
    textAlign: 'center',
  },
});

PlantPhotoList.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.string,
  fileId: PropTypes.number,
};

export default PlantPhotoList;
