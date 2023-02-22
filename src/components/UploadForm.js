import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {spacing, fontSizes} from '../utils/sizes';
import {colors} from '../utils/colors';
import Input from './shared/Input';
import Button from './shared/Button';
import PickerForm from './AddPlant/PickerForm';
import {MainContext} from '../contexts/MainContext';
import {useUpLoadFormState} from '../services/useUploadFormState';
import {uploadUrl} from '../utils/variables';

const UploadForm = ({plant, isOthers, onSubmit}) => {
  const {
    imageSelected,
    setImage,
    setImageSelected,
    setType,
    lastWater,
    notificationTime,
  } = useContext(MainContext);
  const {title, waterInterval} = useUpLoadFormState();

  // Condition to check for disable button
  let buttonStatus = false;

  if (!lastWater || !waterInterval) {
    buttonStatus = true;
  }
  // If the user choose to add plant not in prefix, required all input
  if (
    isOthers &&
    (!lastWater || !notificationTime || !title.value || !imageSelected)
  ) {
    buttonStatus = true;
  }

  // Set prefix image if user don't add their own
  if (!imageSelected) {
    setImage(plant.image);
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
    <ScrollView>
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
        <PickerForm />
        <Button text="Save" onPress={handlerSubmit} disabled={buttonStatus} />
      </View>
    </ScrollView>
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
});

UploadForm.propTypes = {
  plant: PropTypes.object,
  isOthers: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default UploadForm;
