import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useAppImagePicker = (defaultImage) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  //  TODO: Add props so we can give it different aspect or quality value.
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

  /** @type {import('expo-image-picker/src/ImagePicker.types').ImagePickerAsset} */
  // @ts-ignore
  const selectedImageFile = (() => {
    if (!selectedImage) {
      return null;
    }
    const uriArray = selectedImage.uri.split('.');
    const fileExtension = uriArray[uriArray.length - 1];
    // Fix bug for android
    const fileTypeExtended = `image/${fileExtension}`; // e.g: "image/jpg"
    return {
      name: selectedImage.fileName ?? 'image.jpg',
      uri: selectedImage.uri,
      type: fileTypeExtended,
    };
  })();
  return {pickImage, selectedImage, setSelectedImage, selectedImageFile};
};
