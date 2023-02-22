import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UploadForm from '../components/UploadForm';
import {MainContext} from '../contexts/MainContext';
import {userTag} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import LoadingOverlay from '../components/shared/LoadingOverlay';
import ErrorOverlay from '../components/shared/ErrorOverlay';

const Upload = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {image, type, update, upload, setUpload, setUpdate} =
    useContext(MainContext);

  const plantData = route.params.plant;
  let isOthers = false;
  if (plantData.title === 'Others') {
    isOthers = true;
  }

  const handlerSubmit = async (data) => {
    console.log('DESCRIPTION: ', data.description);
    const addData = JSON.stringify(data.description);

    // Get token of user
    const token = await AsyncStorage.getItem('userToken');
    console.log('IMAGE', image);

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

    setIsLoading(true);
    try {
      // console.log('token', token);
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: userTag},
        token
      );
      setUpload(!upload);
      setUpdate(update + 1);
      setTimeout(() => {
        tagResponse && navigation.navigate('UploadCompleted');
      }, 3000);
    } catch (error) {
      setError(error);
      // console.log('error', error);
    }
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <UploadForm
        plant={plantData}
        isOthers={isOthers}
        onSubmit={handlerSubmit}
      />
    </View>
  );
};

Upload.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Upload;
