import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {spacing, fontSizes} from '../utils/sizes';
import {colors} from '../utils/colors';
import Input from './shared/Input';
import Button from './shared/Button';
import {MainContext} from '../contexts/MainContext';
import {useUpLoadFormState} from '../services/useUploadFormState';
import {uploadUrl} from '../utils/variables';
import {usePickerState} from '../services/usePicker';

const UploadForm = ({plant, isOthers, onSubmit}) => {
  const {image, imageSelected, setImage, setImageSelected, setType} =
    useContext(MainContext);
  const {
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
  } = usePickerState();
  const {title, waterInterval} = useUpLoadFormState();
  console.log('IMAGE: ', image);
  console.log('PLANT', plant);

  // Condition to check for disable button
  let buttonStatus = false;

  if (!lastWater || !notificationTime) {
    buttonStatus = true;
  }
  // If the user choose to add plant not in prefix, required all input
  if (
    isOthers &&
    (!lastWater || !notificationTime || !title.value || !imageSelected)
  ) {
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
        setImageSelected(true);
        setType(result.type);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Handler submit form
  const handlerSubmit = () => {
    if (title.value === '') title.value = plant.title;

    const formData = {
      title: title.value,
      description: {
        waterInterval: waterInterval.value,
        lastWater: lastWater,
        notificationTime: notificationTime,
      },
    };

    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: pickUri}} />
      </View>
      <Text style={styles.title}>{plant.title}</Text>
      <Text style={styles.text} onPress={pickImage}>
        Click here to choose your image
      </Text>
      <Input
        text={isOthers ? 'Name your plant' : 'Name your plant (optional)'}
        onChangeText={title.set}
      />
      {isOthers ? (
        <Input
          text="Days between water"
          onChangeText={waterInterval.set}
          error={!waterInterval.valid}
        />
      ) : (
        <></>
      )}
      {!waterInterval.valid && (
        <Text style={styles.text}>
          Invalid input values - Please enter a number
        </Text>
      )}
      <DropDownPicker
        zIndex={3000}
        zIndexInverse={1000}
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
        zIndex={1000}
        zIndexInverse={3000}
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
      <Button text="Save" onPress={handlerSubmit} disabled={buttonStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  isOthers: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default UploadForm;
