import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import Input from '../shared/Input';
import Button from '../shared/Button';
import {MainContext} from '../../contexts/MainContext';
import {IconButton} from 'react-native-paper';
import {useApi} from '../../hooks/ApiHooks';
import {useConfigForm} from '../../services/useConfigForm';
import {uploadUrl} from '../../utils/variables';

export const ConfigOverlay = ({
  name,
  fileId,
  plant,
  closeOverlay,
  navigation,
}) => {
  // console.log('plant config', plant);
  const {
    title,
    setTitle,

    plantLocationItem,
    setPlantLocationItem,
    openPlantLocation,
    setOpenPlantLocation,
    location,
    setLocation,
  } = useConfigForm();
  // console.log(title);

  const {token, setUserPlantListNeedsHydration} = useContext(MainContext);

  const {deleteMedia, putMedia} = useApi();
  // Condition to check for disable button
  let buttonStatus = false;
  if (!location && !title) {
    buttonStatus = true;
  }

  // Default data
  /** @type {import('../../types/BaseModels').UserPlantModelDescription} */
  const description = plant.description;

  // Handler submit form
  const handleSubmit = async () => {
    /** @type {import('../../types/BaseModels').EditUserPlantModel} */
    const data = {
      title: title,
      description: {
        otherNames: description.otherNames,
        difficulty: description.difficulty,
        waterInterval: description.waterInterval,
        location: location,
        waterInstruction: description.waterInstruction,
        cleaningInstruction: description.cleaningInstruction,
        fertilizerInstruction: description.fertilizerInstruction,
      },
    };

    // Stringify the description
    const editDescription = JSON.stringify(data.description);

    // Create a new JSON obj
    const editData = {};
    editData['title'] = data.title;
    editData['description'] = editDescription;

    try {
      const response = await putMedia(fileId, editData, token);
      setTimeout(() => {
        response &&
          Alert.alert('Success', 'Update information successful', [
            {
              text: 'OK',
              onPress: () => {
                setUserPlantListNeedsHydration(true);
                navigation.navigate('Home');
              },
            },
          ]);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete plant
  const deletePlant = async () => {
    // Ask for user's confirmation
    Alert.alert(
      'Are you sure you want to delete this plant?',
      'This plant will be deleted immediately. You cannot undo this action.',
      [
        // Option for cancel action
        {
          text: 'Cancel',
        },
        // Option to confirm delete the file
        {
          text: "I'm sure, let's delete it",
          onPress: async () => {
            try {
              const response = await deleteMedia(fileId, token);
              if (response) {
                console.log('plant delete');
                setUserPlantListNeedsHydration(true);
                navigation.navigate('Home');
              }
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <IconButton
          icon="close"
          size={30}
          iconColor={colors.primary800}
          onPress={closeOverlay}
        />
        <Text style={styles.title}>Modify plant information</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: uploadUrl + plant?.thumbnails?.w640}}
          />
        </View>
        <Text style={styles.text}>Current name: {name}</Text>
        <Input text="Re-name your plant (optional)" onChangeText={setTitle} />

        <DropDownPicker
          zIndex={3000}
          zIndexInverse={1000}
          open={openPlantLocation}
          value={description.location}
          items={plantLocationItem}
          setOpen={setOpenPlantLocation}
          setValue={setLocation}
          setItems={setPlantLocationItem}
          listMode="SCROLLVIEW"
          placeholder="Where is the plant located?"
          containerStyle={styles.picker}
          textStyle={styles.textPicker}
          selectedItemLabelStyle={{fontWeight: 'bold'}}
        />

        <View style={styles.buttonWrapper}>
          <Button
            text="Edit information"
            onPress={handleSubmit}
            disabled={buttonStatus}
          />
          <Button text="Delete plant" onPress={deletePlant} disabled={false} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '50%',
    alignSelf: 'center',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    top: 7,
    borderRadius: spacing.md,
    borderColor: colors.primary100,
    borderWidth: spacing.sm / 4,
  },
  title: {
    fontSize: fontSizes.lg,
    marginTop: spacing.sm,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.primary700,
  },
  input: {
    fontSize: fontSizes.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    textAlign: 'center',
  },

  text: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  picker: {
    height: spacing.xxl,
    width: '82%',
    alignSelf: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
    backgroundColor: colors.primary100,
  },
  textPicker: {
    fontSize: fontSizes.md,
    color: colors.primary700,
  },
});

ConfigOverlay.propTypes = {
  name: PropTypes.string,
  plant: PropTypes.object,
  closeOverlay: PropTypes.func,
  navigation: PropTypes.object,
  fileId: PropTypes.number,
};
