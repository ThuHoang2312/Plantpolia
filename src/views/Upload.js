import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UploadForm from '../components/UploadForm';
import {MainContext} from '../contexts/MainContext';
import {userTag} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import LoadingOverlay from '../components/shared/LoadingOverlay';
import ErrorOverlay from '../components/shared/ErrorOverlay';
import {spacing} from '../utils/sizes';

const Upload = ({navigation, route}) => {
  const [error, setError] = useState();
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {
    image,
    type,
    update,
    upload,
    setUpload,
    setUpdate,
    setLastWater,
    setNotificationTime,
    imageSelected,
    setImageSelected,
  } = useContext(MainContext);
  // console.log('UPLOAD upload', upload);

  const plantData = route.params.plant;
  // const prefixDescription = plantData.description;

  const handlerSubmit = async (data) => {
    const addData = JSON.stringify(data.description);
    // console.log('ADD DATA', addData);

    // Get token of user
    const token = await AsyncStorage.getItem('userToken');
    // console.log('TOKEN', token);
    // console.log('USER', user);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', addData);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      // console.log('token', token);
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: userTag},
        token
      );
      setUpload(!upload);
      // console.log('AFTER REQUEST UPLOAD', upload);
      setUpdate(update + 1);
      setImageSelected(!imageSelected);
      setTimeout(() => {
        tagResponse && navigation.navigate('UploadCompleted');
      }, 1000);
    } catch (error) {
      setError(error.message);
      // console.log('error', error);
    }

    setLastWater('');
    setNotificationTime('');
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !upload) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (upload) {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <UploadForm plant={plantData} onSubmit={handlerSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
});

Upload.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Upload;
