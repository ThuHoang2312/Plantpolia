import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import UploadForm from '../components/UploadForm';
import {MainContext} from '../contexts/MainContext';
import {userPlantTagName} from '../utils/variables';
import {useApi} from '../hooks/ApiHooks';
import ErrorOverlay from '../components/shared/ErrorOverlay';
import {useNotificationStatus} from '../services/useNotificationStatus';

const Upload = ({navigation, route}) => {
  const [error, setError] = useState();
  const {postTag, postMedia} = useApi();
  const {token, setUserPlantListNeedsHydration} = useContext(MainContext);
  const {
    canAskForNotificationPermission,
    isNotificationsGranted,
    requestNotificationPermissions,
  } = useNotificationStatus();
  const {primaryPlant} = route.params;

  /** @type {import('../types/TypedComponents').UploadFormSubmit} */
  const handlerSubmit = async (data) => {
    const addData = JSON.stringify(data.description);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', addData);

    formData.append('file', {
      // @ts-ignore
      name: data.selectedImage.fileName ?? 'image.jpg',
      uri: data.selectedImage.uri,
      type: data.selectedImage.type ?? 'image',
    });

    try {
      // console.log('token', token);
      const response = await postMedia(formData, token);
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: userPlantTagName},
        token
      );
      setUserPlantListNeedsHydration(true);

      setTimeout(() => {
        if (canAskForNotificationPermission && !isNotificationsGranted) {
          requestNotificationPermissions();
        }
        tagResponse && navigation.navigate('UploadCompleted');
      }, 1000);
    } catch (error) {
      setError(error.message);
      // console.log('error', error);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  // if (load) {
  //   return <LoadingOverlay />;
  // }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ScrollView>
      <UploadForm
        primaryPlant={primaryPlant}
        onSubmit={handlerSubmit}
        cancelSubmit={() => navigation.navigate('Home')}
      />
    </ScrollView>
  );
};

Upload.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Upload;
