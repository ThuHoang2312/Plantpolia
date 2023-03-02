import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useApi} from '../hooks/ApiHooks';
import {Button, Card, Input, Text} from '@rneui/themed';
import {Alert, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';
import {applicationPrefixId} from '../utils/variables';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const RegisterForm = ({navigation}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confrimPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });
  const {postLogin, postUser, checkUsername} = useApi();
  const {setUser, setToken, setExpirationDate, ACCESS_TOKEN_AGE_IN_MS} =
    React.useContext(MainContext);

  const onLogin = async (data) => {
    try {
      const userData = await postLogin(data);
      setToken(userData.token);
      setUser(userData.user);
      setExpirationDate(Date.now() + ACCESS_TOKEN_AGE_IN_MS); //  Token expires in 10 min ?
    } catch (error) {
      Alert.alert('Login failed!', 'Wrong username or password!');
      console.error(error);
    }
  };

  const register = async (registerData) => {
    delete registerData.confrimPassword;
    registerData.username = applicationPrefixId + registerData.username;
    registerData.email = applicationPrefixId + registerData.email;
    console.log('Registering: ', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('register result: ', registerResult);
      if (registerResult) {
        Alert.alert('Success', 'User created successfully!');
        delete registerData.full_name;
        delete registerData.email;
        onLogin(registerData);
      }
    } catch (error) {
      console.error('Register', error);
      Alert.alert('Error occurs. Please check input fields again.');
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(applicationPrefixId + username);
      console.log('checkUser', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.wrapper}>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 3,
              message: 'Username min length is 3 characters!',
            },
            validate: checkUser,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
              autoCapitalize="none"
              errorMessage={errors.username && errors.username.message}
              inputContainerStyle={styles.input}
              inputStyle={{color: colors.primary800}}
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
              inputStyle={{color: colors.primary800}}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            pattern: {
              value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
              message:
                'Min 5 characters, needs one number, one uppercase letter',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              errorMessage={errors.password && errors.password.message}
              inputContainerStyle={styles.input}
              inputStyle={{color: colors.primary800}}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            validate: (value) => {
              if (value === getValues('password')) {
                return true;
              } else {
                return 'password must match';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Re-type password"
              secureTextEntry={true}
              autoCapitalize="none"
              errorMessage={
                errors.confrimPassword && errors.confrimPassword.message
              }
              inputContainerStyle={styles.input}
              inputStyle={{color: colors.primary800}}
            />
          )}
          name="confrimPassword"
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
              inputStyle={{color: colors.primary800}}
            />
          )}
          name="full_name"
        />
        <Button
          title="Register!"
          onPress={handleSubmit(register)}
          buttonStyle={styles.button}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    margin: 0,
    backgroundColor: colors.background,
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

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
