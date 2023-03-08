import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useApi} from '../hooks/ApiHooks';
import {Button, Input, Text} from '@rneui/themed';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {applicationPrefixId} from '../utils/variables';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const EditProfile = ({navigation}) => {
  const {isUsernameFocus, setIsUsernameFocus} = React.useState(false);
  const {putUser, checkUsername} = useApi();
  const {setUser, user, token} = React.useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: user.username.split(applicationPrefixId)[1],
      email: user.email.split(applicationPrefixId)[1],
      full_name: user.full_name,
    },
    mode: 'onBlur',
  });
  const onSubmit = async (data) => {
    try {
      data.username = applicationPrefixId + data.username;
      data.email = applicationPrefixId + data.email;
      console.log('edit user', data);
      const userData = await putUser(data, token);
      if (userData) {
        Alert.alert('Success', userData.message);
        delete data.password;
        setUser(data);
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error happened. Please try again!', [{text: 'OK'}]);
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(applicationPrefixId + username);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Update Profile</Text>
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Username min length is 3 characters!',
          },
          validate: isUsernameFocus && checkUser(),
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            onFocus={() => setIsUsernameFocus(true)}
            value={value}
            placeholder={user.username.split(applicationPrefixId)[1]}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
            inputContainerStyle={styles.input}
            inputStyle={{color: colors.primary700}}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /^[a-z0-9.]{1,64}@[a-z0-9.-]{2,64}/i,
            message: 'Please enter a valid email!',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            autoCapitalize="none"
            errorMessage={errors.email && errors.email.message}
            inputContainerStyle={styles.input}
            inputStyle={{color: colors.primary700}}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{minLength: {value: 3, message: 'Min 3 characters.'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full name"
            autoCapitalize="words"
            errorMessage={errors.full_name && errors.full_name.message}
            inputContainerStyle={styles.input}
            inputStyle={{color: colors.primary700}}
          />
        )}
        name="full_name"
      />
      <Button
        title="Update Profile!"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'medium',
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: 50,
    color: colors.primary700,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAF1EA',
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 8,
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 8,
    height: 50,
    backgroundColor: colors.primary700,
  },
  wrapper: {
    flex: 1,
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
