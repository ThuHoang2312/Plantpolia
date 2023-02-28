import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import UploadForm from '../components/UploadForm';
import {MainContext} from '../contexts/MainContext';
import {userPlantTagName} from '../utils/variables';
import {useApi} from '../hooks/ApiHooks';
import ErrorOverlay from '../components/shared/ErrorOverlay';
import {spacing} from '../utils/sizes';

const Upload = ({navigation, route}) => {
  const [error, setError] = useState();
  const {postTag, postMedia} = useApi();
  const {
    image,
    token,
    type,
    upload,
    setUpload,
    setLastWater,
    setNotificationTime,
    setUserPlantListNeedsHydration,
  } = useContext(MainContext);
  const [imageSelected, setImageSelected] = useState(false);

  const plantData = route.params.plant;
  // const prefixDescription = plantData.description;

  const handlerSubmit = async (data) => {
    const addData = JSON.stringify(data.description);

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
        {file_id: response.file_id, tag: userPlantTagName},
        token
      );
      setUpload(!upload);
      // console.log('AFTER REQUEST UPLOAD', upload);
      setUserPlantListNeedsHydration(true);
      setImageSelected(!imageSelected);

      setTimeout(() => {
        tagResponse && navigation.navigate('UploadCompleted');
      }, 1000);
    } catch (error) {
      setError(error.message);
      // console.log('error', error);
    }

    // Clear picker choices
    setLastWater('');
    setNotificationTime('');
    // setPlantLocation('');
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
      <View style={styles.container}>
        <UploadForm
          plant={plantData}
          onSubmit={handlerSubmit}
          cancelSubmit={() => navigation.navigate('Home')}
        />
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
