import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Text} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import {useApi} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import {Alert, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {
  applicationPrefixId,
  createUserAvatarTagName,
  uploadUrl,
} from '../utils/variables';
import {colors} from '../utils/colors';
import {useNotificationStatus} from '../services/useNotificationStatus';
import {fontFamily} from '../utils/sizes';

const Profile = ({navigation}) => {
  const {
    setUser,
    setExpirationDate,
    setToken,
    user,
    token,
    setUserPlantListNeedsHydration,
    setWateringEventListNeedsHydration,
  } = React.useContext(MainContext);
  const {getFileByTag, postTag, postMedia} = useApi();
  const {
    canAskForNotificationPermission,
    isNotificationsGranted,
    requestNotificationPermissions,
  } = useNotificationStatus();
  const [avatar, setAvatar] = React.useState(
    'https://www.linkpicture.com/q/PngItem_998739.png'
  );
  const [type, setType] = React.useState('image');
  const [isAvatarAvailable, setIsAvatarAvailable] = React.useState(true);

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFileByTag(
        createUserAvatarTagName(user.user_id)
      );
      console.log('avatar tag', createUserAvatarTagName(user.user_id));
      if (avatarArray.length == 0) {
        setIsAvatarAvailable(false);
      } else {
        setIsAvatarAvailable(true);
        console.log(avatarArray);
        setAvatar(avatarArray.pop().filename);
      }
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  const changeAvatar = async () => {
    try {
      await getFileByTag(createUserAvatarTagName(user.user_id));
      uploadAvatar();
    } catch (error) {
      console.error('changeAvatar', error);
    }
  };

  const uploadAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      // @ts-ignore
      setAvatar(result.assets[0]);
      setType(result.assets[0].type);
    }

    const formData = new FormData();
    formData.append('title', 'avatar');

    const filename = result.assets[0].uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = result.assets[0].type + '/' + fileExt;
    formData.append('file', {
      // @ts-ignore
      uri: result.assets[0].uri,
      name: filename,
      type: mimeType,
    });

    if (type === 'video') {
      Alert.alert('Error', "Avatar can't be a video.", [{text: 'OK'}]);
      return;
    }

    try {
      const result = await postMedia(formData, token);
      const appTag = {
        file_id: result.file_id,
        tag: createUserAvatarTagName(user.user_id),
      };
      await postTag(appTag, token);
      Alert.alert('Successful', "You've changed your avatar!", [
        {
          text: 'OK',
          onPress: () => {
            loadAvatar();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', "Something's wrong. Please try again.", [
        {text: 'Ok'},
      ]);
    }
  };

  React.useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Avatar
            source={{
              uri: isAvatarAvailable
                ? uploadUrl + avatar
                : 'https://www.linkpicture.com/q/PngItem_998739.png',
            }}
            rounded
            size={250}
            containerStyle={styles.avatar}
          />
          <Text style={styles.fullname}>{user.full_name}</Text>
          <Text style={styles.username}>
            {'@' + user.username.split(applicationPrefixId)[1]}
          </Text>
          <Button
            title={'Change avatar'}
            buttonStyle={styles.changeAvatarButton}
            titleStyle={{
              color: colors.primary700,
              fontWeight: 'bold',
              fontFamily: fontFamily.regular,
            }}
            onPress={changeAvatar}
          />
          <Button
            title="Edit Profile"
            buttonStyle={styles.editButton}
            titleStyle={{
              color: colors.primary700,
              fontWeight: 'bold',
              fontFamily: fontFamily.regular,
            }}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
          {canAskForNotificationPermission && !isNotificationsGranted && (
            <Button
              title="Allow notifications"
              buttonStyle={styles.editButton}
              titleStyle={{
                color: colors.primary700,
                fontWeight: 'bold',
                fontFamily: fontFamily.regular,
              }}
              onPress={() => {
                requestNotificationPermissions();
              }}
            />
          )}
        </View>
        <Button
          title="Logout!"
          onPress={async () => {
            console.log('Loggin out');
            setUser(null);
            setExpirationDate(null);
            setToken(null);
            setUserPlantListNeedsHydration(true);
            setWateringEventListNeedsHydration(true);
          }}
          buttonStyle={styles.logoutButton}
          titleStyle={{fontWeight: 'bold', fontFamily: fontFamily.regular}}
        />
      </ScrollView>
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  avatar: {
    marginTop: 10,
    borderColor: colors.primary100,
    borderWidth: 5,
  },
  fullname: {
    color: colors.primary600,
    fontSize: 30,
    marginVertical: 20,
    fontWeight: 'bold',
    fontFamily: fontFamily.regular,
  },
  username: {
    color: colors.primary600,
    fontSize: 25,
    marginVertical: 10,
    fontFamily: fontFamily.regular,
  },
  changeAvatarButton: {
    backgroundColor: colors.primary50,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: 280,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    padding: 20,
  },
  editButton: {
    backgroundColor: colors.primary50,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    width: 280,
    padding: 20,
  },
});

export default Profile;
