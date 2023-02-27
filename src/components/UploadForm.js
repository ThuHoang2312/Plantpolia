import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {spacing, fontSizes} from '../utils/sizes';
import {colors} from '../utils/colors';
import Input from './shared/Input';
import Button from './shared/Button';
import {MainContext} from '../contexts/MainContext';
import {useUploadFormState} from '../services/useUploadFormState';
import {uploadUrl} from '../utils/variables';

const UploadForm = ({plant, onSubmit, cancelSubmit, isModify}) => {
  const {setImage, setImageSelected, setType} = useContext(MainContext);
  const {
    title,
    setTitle,
    lastWater,
    lastWaterItem,
    notificationTime,
    notificationTimeItem,
    onLastWaterOpen,
    onNotificationTimeOpen,
    setLastWater,
    setLastWaterItem,
    setNotificationTime,
    setNotificationTimeItem,
    openLastWater,
    openNotificationTime,
    setOpenLastWater,
    setOpenNotificationTime,
    plantLocation,
    plantLocationItem,
    onPlantLocationOpen,
    setPlantLocation,
    setOpenPlantLocation,
    setPlantLocationItem,
    openPlantLocation,
  } = useUploadFormState();

  // Get the default values from database
  const defaultValues = JSON.parse(plant.description);
  // console.log('UPLOAD FORM DEFAULT: ', defaultValues);

  // Condition to check for disable button
  let buttonStatus = false;

  if (!lastWater || !notificationTime || !plantLocation) {
    buttonStatus = true;
  }

  const imageUrl = uploadUrl + plant.thumbnails.w160;
  const [pickUri, setPickUri] = useState(imageUrl);

  // pick image function
  const pickImage = async (id) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });
      setPickUri(result.uri);

      if (!result.canceled) {
        setImage(result.uri);
        // console.log('SET IMAGE IF PICK', result.uri);
        setImageSelected(true);
        setType(result.type);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Handler submit form
  const handlerSubmit = () => {
    // Set default values when submit the form
    if (title === '') setTitle(plant.title);

    const formData = {
      title: title,
      description: {
        waterInterval: defaultValues.waterInterval,
        lastWater: lastWater,
        notificationTime: notificationTime,
        plantLocation: plantLocation,
        clean: defaultValues.clean,
        level: defaultValues.level,
        liquidFertilizing: defaultValues.liquidFertilizing,
        otherNames: defaultValues.otherNames,
        waterInstruction: defaultValues.waterInstruction,
      },
    };

    onSubmit(formData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: pickUri}} />
        </View>
        <Text style={styles.title}>{plant.title}</Text>
        <Text style={styles.text} onPress={pickImage}>
          Click here to choose your image
        </Text>
        <Input text="Name your plant (optional)" onChangeText={setTitle} />

        <DropDownPicker
          zIndex={6000}
          zIndexInverse={5000}
          open={openPlantLocation}
          onOpen={onPlantLocationOpen}
          value={plantLocation}
          items={plantLocationItem}
          setOpen={setOpenPlantLocation}
          setValue={setPlantLocation}
          setItems={setPlantLocationItem}
          listMode="SCROLLVIEW"
          placeholder="Where is the plant located?"
          containerStyle={styles.picker}
          textStyle={styles.textPicker}
          selectedItemLabelStyle={{fontWeight: 'bold'}}
        />
        {isModify ? (
          <></>
        ) : (
          <>
            <DropDownPicker
              zIndex={6000}
              zIndexInverse={3000}
              open={openLastWater}
              onOpen={onLastWaterOpen}
              value={lastWater}
              items={lastWaterItem}
              setOpen={setOpenLastWater}
              setValue={setLastWater}
              setItems={setLastWaterItem}
              listMode="SCROLLVIEW"
              placeholder="Last time the plant was watered?"
              containerStyle={styles.picker}
              textStyle={styles.textPicker}
              selectedItemLabelStyle={{fontWeight: 'bold'}}
            />
            <DropDownPicker
              zIndex={3000}
              zIndexInverse={6000}
              placeholder="Notification time preferences"
              open={openNotificationTime}
              value={notificationTime}
              items={notificationTimeItem}
              setItems={setNotificationTimeItem}
              setOpen={setOpenNotificationTime}
              setValue={setNotificationTime}
              listMode="SCROLLVIEW"
              onOpen={onNotificationTimeOpen}
              containerStyle={styles.picker}
              textStyle={styles.textPicker}
              selectedItemLabelStyle={{fontWeight: 'bold'}}
            />
          </>
        )}
        <View style={styles.buttonWrapper}>
          <Button text="Save" onPress={handlerSubmit} disabled={buttonStatus} />
          <Button text="Cancel" onPress={cancelSubmit} disabled={false} />
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
    flexDirection: 'row',
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
    color: colors.primary700,
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

UploadForm.propTypes = {
  plant: PropTypes.object,
  onSubmit: PropTypes.func,
  cancelSubmit: PropTypes.func,
  isModify: PropTypes.bool,
};

export default UploadForm;
