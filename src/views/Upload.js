import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import UploadForm from '../components/UploadForm';
import {MainContext} from '../contexts/MainContext';
import {
  createPlantWateringEventName,
  DAY_IN_MILLI_SECONDS,
  userPlantTagName,
} from '../utils/variables';
import {useApi} from '../hooks/ApiHooks';
import ErrorOverlay from '../components/shared/ErrorOverlay';
import {useNotificationStatus} from '../services/useNotificationStatus';
import {useLogger} from '../services/useLogger';

const Upload = ({navigation, route}) => {
  const {log} = useLogger('Upload');

  const [error, setError] = useState();
  const {postTag, postMedia, postCommentByMediaId} = useApi();
  const {
    token,
    setUserPlantListNeedsHydration,
    setWateringEventListNeedsHydration,
  } = useContext(MainContext);
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

      const waterInterval = data.description.waterInterval;
      const lastWater = data.lastWater;

      if (waterInterval > lastWater) {
        //  Example: If interval is 5 and last water is 2 then user needs to water it after three days.
        //  Example: Create a watering event for 2 days ago
        const [result, error] = await postCommentByMediaId(
          response.file_id,
          createPlantWateringEventName(
            Date.now() - (waterInterval - lastWater) * DAY_IN_MILLI_SECONDS
          ),
          token
        );
        log({result, error});
        setWateringEventListNeedsHydration(true);
      }

      if (waterInterval <= lastWater) {
        //  If interval is 5 and last water is 7 then user needs to water it immediately
        //  Todo: Create a immediate notification for the user
      }

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
