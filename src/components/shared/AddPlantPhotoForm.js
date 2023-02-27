import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import {Card, Icon} from '@rneui/themed';
import {MainContext} from '../../contexts/MainContext';
import {useApi} from '../../hooks/ApiHooks';
import Button from './Button';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {createPlantPhotoTagName} from '../../utils/variables';

export const AddPlantPhotoForm = ({title, fileId, closeForm}) => {
  // console.log(`${fileId}${userTag}`);

  const {
    token,
    setImageSelected,
    type,
    setType,
    setUpload,
    upload,
    imageSelected,
    update,
    setUpdate,
  } = useContext(MainContext);
  const {postTag, postMedia} = useApi();
  const [pickUri, setPickUri] = useState('defaultPhoto');
  const {
    control,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: title,
      description: '',
    },
    mode: 'onChange',
  });

  // pick image function
  const pickImage = async (id) => {
    setImageSelected(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        setPickUri(result.uri);
        setImageSelected(true);
        setType(result.type);
      }
    } catch (err) {
      // TODO: set error handler
      console.log(err.message);
    }
  };

  // // Submit request form
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', 'title');
    formData.append('description', data.description);
    const filename = pickUri.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: pickUri,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: createPlantPhotoTagName(fileId)},
        token
      );

      setTimeout(() => {
        tagResponse &&
          Alert.alert('Success', 'Uploaded successfully', [
            {
              text: 'OK',
              onPress: () => {
                setUpload(!upload);
                //  TODO: fix: boolean + number ?
                setUpdate(update + 1);
                // setImage(imageDefault);
                setImageSelected(!imageSelected);
                reset();
                closeForm();
              },
            },
          ]);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}> Keep notes on progress</Text>
      <Text style={styles.text}>Add a picture of your plant</Text>

      <Card containerStyle={styles.card}>
        {imageSelected ? (
          <Card.Image
            source={{uri: pickUri}}
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

      <Text style={styles.text}>Note (Optional)</Text>
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
        name="description"
      />

      <Button text="Submit" onPress={onSubmit} disabled={!imageSelected} />
    </View>
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

AddPlantPhotoForm.propTypes = {
  title: PropTypes.string,
  fileId: PropTypes.number,
  closeForm: PropTypes.func,
};
