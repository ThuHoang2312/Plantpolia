import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {Card, Icon, Input} from '@rneui/themed';
import {MainContext} from '../../contexts/MainContext';
import {useApi} from '../../hooks/ApiHooks';
import Button from './Button';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {createPlantPhotoTagName} from '../../utils/variables';

export const AddPlantPhotoForm = ({title, fileId, closeForm}) => {
  const {token, type, setType} = useContext(MainContext);
  const {postTag, postMedia} = useApi();
  const [pickUri, setPickUri] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [notes, setNotes] = useState('');

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
      console.log(err.message);
    }
  };

  // Clear form
  const onReset = () => {
    setNotes('');
    setPickUri('');
    setImageSelected(!imageSelected);
  };

  // // Submit request form
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', notes);
    const filename = pickUri.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      // @ts-ignore
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
                onReset();
                closeForm(true);
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
        <Icon
          name="image"
          size={50}
          type="font-awesome"
          color={colors.primary800}
          onPress={pickImage}
        />
      </Card>

      <Text style={styles.text}>Note (Optional)</Text>

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setNotes}
        value={notes}
        placeholder="Notes"
        multiline={true}
        numberOfLines={5}
      />

      <Button
        text="Submit"
        onPress={onSubmit}
        disabled={!imageSelected || !notes}
      />

      <Button text="Reset" onPress={onReset} disabled={false} />
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
    backgroundColor: colors.primary50,
    borderRadius: spacing.md,
    padding: spacing.md,
    fontSize: spacing.md,
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
