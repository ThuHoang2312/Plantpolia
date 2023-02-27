import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Overlay} from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import Button from './Button';
import {MainContext} from '../../contexts/MainContext';
import {useTag} from '../../hooks/ApiHooks';
import {usePostMedia} from '../../hooks/MediaHooks';
import {imageDefault, requestedPlantTagName} from '../../utils/variables';

const PlantNotFound = ({navigation, isUserList}) => {
  const [visible, setVisible] = useState(false);
  const {
    token,
    image,
    setImage,
    setImageSelected,
    type,
    setType,
    setUpload,
    upload,
    imageSelected,
    update,
    setUpdate,
  } = useContext(MainContext);
  const {postMedia} = usePostMedia();
  const {postTag} = useTag();
  const toggleOverlay = () => {
    setImageSelected(false);
    setVisible(!visible);
  };

  // // Check default vaue:
  // console.log('BeGINING IMAGE: ', image);
  // console.log('BeGINING IMAGE SELECTED: ', imageSelected);

  const {
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      scientificName: '',
      commonName: '',
    },
    mode: 'onChange',
  });

  // pick image function
  const pickImage = async (id) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        setImage(result.uri);
        setImageSelected(true);
        setType(result.type);
        // Check Image after value:
        console.log('AFTER PICK IMAGE: ', image);
        console.log('AFTER PICK IMAGE SELECTED: ', imageSelected);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // // Submit request form
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', 'title');
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: requestedPlantTagName},
        token
      );
      setUpload(!upload);
      //  TODO: fix: boolean + number ?
      setUpdate(update + 1);
      setImage(imageDefault);
      setImageSelected(!imageSelected);

      // // AFTer submit vaue:
      // console.log('AFTER SM IMAGE: ', image);
      // console.log('AFTER SM IMAGE SELECTED: ', imageSelected);
      setTimeout(() => {
        tagResponse &&
          Alert.alert('Success', 'Uploaded successfully', [
            {
              text: 'OK',
            },
          ]);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

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
            <Button
              text="Suggest plant to be added"
              disabled={false}
              onPress={toggleOverlay}
            />
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
              {imageSelected ? (
                <Card.Image
                  source={{uri: image}}
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
              disabled={!imageSelected}
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
  },
  text: {
    color: colors.primary700,
    fontSize: fontSizes.md,
    marginVertical: spacing.md,
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
