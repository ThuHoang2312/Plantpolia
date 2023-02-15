import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input, Text} from '@rneui/themed';

const LoginForm = (props) => {
  const {setIsLoggedIn, setUser} = React.useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: '', password: ''}, mode: 'onBlur'});

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    // const data = {username: 'thuhoang', password: '123456789A'};
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
      // TODO: notify user about failed login attempt
    }
  };

  return (
    <>
      <Text h3 h3Style>
        Login
      </Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username min length is 3 characters!',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{required: {value: true, message: 'This is required.'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      <Button title="Sign in!" onPress={handleSubmit(logIn)} />
    </>
  );
};

export default LoginForm;
