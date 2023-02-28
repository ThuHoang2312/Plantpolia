import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';
import Input from './shared/Input';
import Button from './shared/Button';
import {MainContext} from '../contexts/MainContext';
import {uploadUrl} from '../utils/variables';
import {useNewUserPlantForm} from '../services/useNewUserPlantForm';

/** @type {import('../types/TypedComponents').UploadForm} */
const UploadForm = ({primaryPlant, onSubmit, cancelSubmit}) => {
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
  } = useNewUserPlantForm({
    primaryPlant,
  });

  // Get the default values from database
  // console.log('UPLOAD FORM DEFAULT: ', defaultValues);

  // Condition to check for disable button
  let buttonStatus = false;

  if (!lastWater || !notificationTime || !plantLocation) {
    buttonStatus = true;
  }

  const imageUrl = uploadUrl + primaryPlant.thumbnails.w160;
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
    onSubmit({
      title: primaryPlant.title ?? title,
      description: {
        waterInterval: primaryPlant.description.waterInterval,
        otherNames: primaryPlant.description.otherNames,
        cleaningInstruction: primaryPlant.description.cleaningInstruction,
        waterInstruction: primaryPlant.description.waterInstruction,
        fertilizerInstruction: primaryPlant.description.fertilizerInstruction,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: pickUri}} />
      </View>
      <Text style={styles.title}>{primaryPlant.title}</Text>

      <Text style={styles.text} onPress={pickImage}>
        Click here to choose your image
      </Text>

      <Input text="Name your plant (optional)" onChangeText={setTitle} />

      <DropDownPicker
        zIndex={4}
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

      <DropDownPicker
        zIndex={3}
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
        zIndex={2}
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

      <View style={styles.buttonWrapper}>
        <Button text="Save" onPress={handlerSubmit} disabled={buttonStatus} />
        <Button text="Cancel" onPress={cancelSubmit} disabled={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 100,
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
  primaryPlant: PropTypes.any,
  onSubmit: PropTypes.func,
  cancelSubmit: PropTypes.func,
};

export default UploadForm;
