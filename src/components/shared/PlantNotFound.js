import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Overlay} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import Button from './Button';
import {MainContext} from '../../contexts/MainContext';
import {useApi} from '../../hooks/ApiHooks';
import {requestedPlantTagName} from '../../utils/variables';
import {useRequestedPlantHooks} from '../../hooks/useRequestedPlantHooks';
import {useAppImagePicker} from '../useAppImagePicker';

const PlantNotFound = ({navigation, isUserList}) => {
  const [visible, setVisible] = useState(false);
  const {pickImage, selectedImage, setSelectedImage, selectedImageFile} =
    useAppImagePicker(null);

  const {token} = useContext(MainContext);

  const {postTag, postMedia} = useApi();

  const {setRequestedPlantListNeedsHydration} = useRequestedPlantHooks();
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const {
    control,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      scientificName: '',
      commonName: '',
    },
    mode: 'onChange',
  });

  // // Submit request form
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', 'title');
    formData.append('description', data.description);
    // @ts-ignore
    formData.append('file', selectedImageFile);
    try {
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: requestedPlantTagName},
        token
      );
      setRequestedPlantListNeedsHydration(true);

      setTimeout(() => {
        tagResponse &&
          Alert.alert('Success', 'Uploaded successfully', [
            {
              text: 'OK',
            },
          ]);
        setSelectedImage(null);
        reset();
        setVisible(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  console.log({selectedImage});
  return (
    <>
      {isUserList ? (
        <View style={styles.container}>
          <Text style={styles.title}>Plant not found</Text>
          <Text style={styles.text}>
            You can add the plant by clicking the add button
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Plant not found</Text>
            <Text style={styles.text}>
              You can suggest this plant to be added. Please note that
              Plantpolia supports only houseplant right now.
            </Text>
          </View>
          <View style={styles.container}>
            <Button text="Suggest" disabled={false} onPress={toggleOverlay} />
          </View>
          <Overlay
            overlayStyle={styles.overlay}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
          >
            <Text style={styles.title}>Suggest plant</Text>
            <Text style={styles.text}>
              Add a picture of your plant (Required)
            </Text>

            <Card containerStyle={styles.card}>
              {selectedImage ? (
                <Card.Image
                  source={{uri: selectedImage?.uri}}
                  style={styles.image}
                  onPress={pickImage}
                />
              ) : (
                <Icon
                  name="image"
                  size={50}
                  type="font-awesome"
                  color={colors.primary800}
                  onPress={pickImage}
                />
              )}
            </Card>

            <Text style={styles.text}>Scientific name (required)</Text>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This is required.'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  errorMessage={errors.description}
                />
              )}
              name="scientificName"
            />

            <Text style={styles.text}>Common name (Optional)</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  errorMessage={errors.description}
                />
              )}
              name="commonName"
            />

            <Button
              text="Submit"
              onPress={onSubmit}
              disabled={!selectedImage}
            />
            <Button text="Cancel" onPress={toggleOverlay} />
          </Overlay>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    marginVertical: spacing.md,
    fontWeight: 'bold',
    color: colors.primary700,
    fontFamily: fontFamily.regular,
  },
  text: {
    color: colors.primary700,
    fontSize: fontSizes.md,
    marginVertical: spacing.md,
    fontFamily: fontFamily.regular,
  },
  overlay: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    height: '80%',
    width: '80%',
  },
  input: {
    marginVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.primary700,
    padding: spacing.sm,
    backgroundColor: colors.primary50,
    borderRadius: spacing.sm,
    height: spacing.xxl,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: colors.primary100,
    borderWidth: spacing.sm / 4,
    fontFamily: fontFamily.regular,
  },
  card: {
    borderRadius: spacing.sm,
    width: '90%',
  },
  image: {
    resizeMode: 'contain',
    height: spacing.xxxl,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    alignSelf: 'center',
  },
});

PlantNotFound.propTypes = {
  navigation: PropTypes.object.isRequired,
  isUserList: PropTypes.bool,
};

export default PlantNotFound;
