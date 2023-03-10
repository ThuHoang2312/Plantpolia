import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {fontFamily, fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';
import Input from './shared/Input';
import Button from './shared/Button';
import {useNewUserPlantForm} from '../services/useNewUserPlantForm';
import {useAppImagePicker} from './useAppImagePicker';
import {uploadUrl} from '../utils/variables';
import {safeIntegerParse} from '../utils/safeIntegerParse';

/** @type {import('../types/TypedComponents').UploadForm} */
const UploadForm = ({primaryPlant, onSubmit, cancelSubmit}) => {
  const {pickImage, selectedImage, selectedImageFile} = useAppImagePicker({
    uri: uploadUrl + primaryPlant.thumbnails.w640,
  });

  const {
    title,
    setTitle,

    lastTimeWateredDropdownOptions,
    selectedLastTimeWateredDropdownOption,
    setSelectedLastTimeWateredDropdownOption,
    openLastTimeWateredDropdown,
    onLastTimeWateredDropdownOpen,
    setOpenLastTimeWateredDropdown,

    locationOptions,
    openLocationDropdown,
    selectedLocationDropdownOption,
    onLocationDropdownOpen,
    setOpenLocationDropdown,
    setSelectedLocationDropdownOption,
  } = useNewUserPlantForm({
    primaryPlant,
  });

  const handlerSubmit = () => {
    onSubmit({
      lastWater: safeIntegerParse(selectedLastTimeWateredDropdownOption),
      selectedImageFile: selectedImageFile,
      title: title,
      description: {
        waterInterval: safeIntegerParse(primaryPlant.description.waterInterval),
        otherNames: primaryPlant.description.otherNames,
        cleaningInstruction: primaryPlant.description.cleaningInstruction,
        waterInstruction: primaryPlant.description.waterInstruction,
        fertilizerInstruction: primaryPlant.description.fertilizerInstruction,
        location: selectedLocationDropdownOption,
        difficulty: primaryPlant.description.difficulty,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: selectedImage?.uri}} />
      </View>
      <Text style={styles.title}>{primaryPlant.title.toUpperCase()}</Text>

      <Text style={styles.text} onPress={pickImage}>
        Click here to choose your image
      </Text>

      <Text style={styles.suggestion}>Re-name your plant here (optional)</Text>
      <Input
        defaultValue={title}
        // text="Name your plant (optional)"
        onChangeText={setTitle}
      />

      <DropDownPicker
        zIndex={3000}
        zIndexInverse={1000}
        dropDownDirection="TOP"
        placeholder="Where is the plant located?"
        open={openLocationDropdown}
        value={selectedLocationDropdownOption}
        items={locationOptions}
        setOpen={setOpenLocationDropdown}
        setValue={setSelectedLocationDropdownOption}
        listMode="SCROLLVIEW"
        onOpen={onLocationDropdownOpen}
        containerStyle={styles.picker}
        textStyle={styles.textPicker}
        selectedItemLabelStyle={{fontWeight: 'bold'}}
      />

      <DropDownPicker
        zIndex={1000}
        zIndexInverse={3000}
        dropDownDirection="TOP"
        open={openLastTimeWateredDropdown}
        onOpen={onLastTimeWateredDropdownOpen}
        value={selectedLastTimeWateredDropdownOption}
        items={lastTimeWateredDropdownOptions}
        setOpen={setOpenLastTimeWateredDropdown}
        setValue={setSelectedLastTimeWateredDropdownOption}
        listMode="SCROLLVIEW"
        placeholder="Last time the plant was watered?"
        containerStyle={styles.picker}
        textStyle={styles.textPicker}
        selectedItemLabelStyle={{fontWeight: 'bold'}}
      />

      <View style={styles.buttonWrapper}>
        <Button
          text="Save"
          onPress={handlerSubmit}
          disabled={
            !selectedLastTimeWateredDropdownOption ||
            !selectedLocationDropdownOption
          }
        />
        <Button text="Cancel" onPress={cancelSubmit} disabled={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 100,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    marginHorizontal: 10,
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
    fontFamily: fontFamily.regular,
  },
  text: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    fontWeight: 'bold',
    fontFamily: fontFamily.regular,
  },
  suggestion: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    alignSelf: 'center',
    fontFamily: fontFamily.regular,
  },
  picker: {
    height: spacing.xxl,
    width: '82%',
    alignSelf: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
    backgroundColor: colors.primary100,
    fontFamily: fontFamily.regular,
  },
  textPicker: {
    fontSize: fontSizes.md,
    color: colors.primary700,
    fontFamily: fontFamily.regular,
  },
});

UploadForm.propTypes = {
  primaryPlant: PropTypes.any,
  onSubmit: PropTypes.func,
  cancelSubmit: PropTypes.func,
};

export default UploadForm;
