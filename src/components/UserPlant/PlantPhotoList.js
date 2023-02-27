import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View, Text, ScrollView} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Overlay, Card, Icon} from '@rneui/themed';
import {useMedia} from '../../hooks/ApiHooks';
import {colors} from '../../utils/colors';
import {useSearch} from '../../services/useSearch';
import PlantNotFound from '../shared/PlantNotFound';
import LoadingOverlay from '../shared/LoadingOverlay';
import {fontSizes, spacing} from '../../utils/sizes';
import {AddPlantForm} from '../shared/AddPlantForm';
import {PlantPhotoListItem} from './PlantPhotoListItem';

const PlantPhotoList = ({title, fileId, navigation}) => {
  const {photoArray, load} = useMedia(true, fileId);

  // Overlay state and function
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconButton
          icon="image-plus"
          iconColor={colors.primary700}
          size={35}
          onPress={toggleOverlay}
        />
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
          <IconButton
            icon="close"
            iconColor={colors.primary700}
            size={35}
            onPress={toggleOverlay}
          />
          <AddPlantForm
            title={title}
            fileId={fileId}
            closeForm={toggleOverlay}
          />
        </Overlay>
      </View>
      <View style={styles.photoContainer}>
        {photoArray.length === 0 ? (
          <Text style={styles.text}>You have not add any photos or notes</Text>
        ) : (
          <>
            <FlatList
              numColumns={2}
              // style={styles.listContainer}
              // contentContainerStyle={styles.list}
              // columnWrapperStyle={styles.column}
              data={photoArray}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <PlantPhotoListItem
                  description={item.description}
                  imageUrl={item.thumbnails.w160}
                  title={title}
                  date={item.time_added}
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
    fontSize: fontSizes.md,
    color: colors.primary800,
    textAlign: 'center',
  },
});

PlantPhotoList.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.string,
  fileId: PropTypes.number,
};

export default PlantPhotoList;
