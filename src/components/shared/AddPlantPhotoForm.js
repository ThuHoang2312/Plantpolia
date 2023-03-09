import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {Card, Icon} from '@rneui/themed';
import {MainContext} from '../../contexts/MainContext';
import {useApi} from '../../hooks/ApiHooks';
import Button from './Button';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
import {createPlantPhotoTagName} from '../../utils/variables';
import {useAppImagePicker} from '../useAppImagePicker';

export const AddPlantPhotoForm = ({title, fileId, closeForm}) => {
  const {token} = useContext(MainContext);
  const {postTag, postMedia} = useApi();
  const {selectedImage, pickImage, setSelectedImage, selectedImageFile} =
    useAppImagePicker(null);
  const [notes, setNotes] = useState('');

  // Clear form
  const onReset = () => {
    setNotes('');
    setSelectedImage(null);
  };

  // // Submit request form
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', notes);
    // @ts-ignore
    formData.append('file', selectedImageFile);
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

      <Text style={styles.text}>Note </Text>

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
        disabled={!selectedImage || !notes}
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
    backgroundColor: colors.primary50,
    borderRadius: spacing.md,
    padding: spacing.md,
    fontSize: spacing.md,
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

AddPlantPhotoForm.propTypes = {
  title: PropTypes.string,
  fileId: PropTypes.number,
  closeForm: PropTypes.func,
};
