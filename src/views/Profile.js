import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Text} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Alert, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {uploadUrl} from '../utils/variables';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/colors';

const Profile = ({navigation}) => {
  const {setUser, setExpirationDate, setToken, user} =
    React.useContext(MainContext);
  const {getFileByTag, postTag} = useTag();
  const {postMedia} = useMedia();
  const [avatar, setAvatar] = React.useState(
    'https://www.linkpicture.com/q/PngItem_998739.png'
  );
  const [type, setType] = React.useState('image');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFileByTag('avatar_' + user.user_id);
      if (avatarArray.length == 0) {
        setAvatar('https://www.linkpicture.com/q/PngItem_998739.png');
      } else {
        setAvatar(avatarArray.pop().filename);
      }
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  const changeAvatar = async () => {
    try {
      await getFileByTag('avatar_' + user.user_id);
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
      uri: result.assets[0].uri,
      name: filename,
      type: mimeType,
    });

    if (type === 'video') {
      Alert.alert('Error', "Avatar can't be a video.", [{text: 'OK'}]);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      // const avatarArray = await getFileByTag('avatar_' + user.user_id);
      const result = await postMedia(formData, token);
      const appTag = {file_id: result.file_id, tag: 'avatar_' + user.user_id};
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
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={{position: 'relative', alignItems: 'center'}}>
          <Avatar
            source={{
              uri:
                uploadUrl + avatar ||
                'https://www.linkpicture.com/q/PngItem_998739.png',
            }}
            rounded
            size={250}
            containerStyle={styles.avatar}
          />
          {/* <Text>{user.full_name}</Text>  */}
          <Text style={styles.fullname}>Thu Hoang</Text>
          <Text style={styles.username}>{'@' + user.username.slice(11)}</Text>
          <Button
            title={'Change avatar'}
            buttonStyle={styles.changeAvatarButton}
            titleStyle={{color: colors.primary700, fontWeight: 'bold'}}
            onPress={changeAvatar}
          />
          <Button
            title="Edit Profile"
            buttonStyle={styles.editButton}
            titleStyle={{color: colors.primary700, fontWeight: 'bold'}}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </View>
        <Button
          title="Logout!"
          onPress={async () => {
            console.log('Loggin out');
            setUser(null);
            setExpirationDate(null);
            setToken(null);
          }}
          buttonStyle={styles.logoutButton}
          titleStyle={{fontWeight: 'bold'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  avatar: {
    borderColor: colors.primary100,
    borderWidth: 5,
  },
  fullname: {
    color: colors.primary600,
    fontSize: 30,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  username: {
    color: colors.primary600,
    fontSize: 25,
    marginVertical: 10,
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
