import React, {useContext, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Input, Text} from '@rneui/themed';
import {MainContext} from '../../contexts/MainContext';
import {useApi} from '../../hooks/ApiHooks';
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
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView>
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

          <Input
            placeholder="Notes"
            autoCapitalize="none"
            value={notes}
            onChangeText={setNotes}
            style={[styles.inputSelfStyle]}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={{}}
            containerStyle={{
              borderWidth: 0,
              shadowOpacity: 0,
            }}
          />

          <Button
            title="Submit"
            onPress={onSubmit}
            disabled={!selectedImage || !notes}
            containerStyle={{marginVertical: 5}}
          />

          <Button
            title="Reset"
            onPress={onReset}
            disabled={false}
            containerStyle={{marginVertical: 5}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.lg,
    marginVertical: spacing.md,
    color: colors.primary700,
    fontFamily: fontFamily.regular,
  },
  overlay: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    height: '80%',
    width: '80%',
  },
  inputSelfStyle: {
    backgroundColor: colors.primary50,
    borderRadius: spacing.md,
    fontSize: spacing.md,
    paddingHorizontal: spacing.md,
  },
  inputContainerStyle: {
    borderRadius: spacing.md,
    borderBottomWidth: 0,
    marginVertical: spacing.lg,
  },
  inputStyle: {
    color: colors.primary800,
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
