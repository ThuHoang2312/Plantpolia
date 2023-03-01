import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useAppImagePicker = (defaultImage) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const pickImage = () => {
    (async () => {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      } else {
        setSelectedImage(null);
      }
    })();
  };

  return {pickImage, selectedImage, setSelectedImage};
};
