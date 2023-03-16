import React from 'react';
import {useApi} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@rneui/themed';
import {Alert, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';
import {applicationPrefixId} from '../utils/variables';
import {fontFamily} from '../utils/sizes';

const LoginForm = (props) => {
  const {
    setUser,
    setToken,
    setExpirationDate,
    ACCESS_TOKEN_AGE_IN_MS,
    setUserPlantListNeedsHydration,
    setWateringEventListNeedsHydration,
  } = React.useContext(MainContext);
  const {postLogin} = useApi();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: '', password: ''}, mode: 'onBlur'});

  const logIn = async (loginData) => {
    try {
      // Add prefix to username and email to identify Plantpolia's users
      loginData.username = applicationPrefixId + loginData.username;
      loginData.email = applicationPrefixId + loginData.email;
      const loginResult = await postLogin(loginData);
      setUser(loginResult.user);
      setToken(loginResult.token);
      setExpirationDate(Date.now() + ACCESS_TOKEN_AGE_IN_MS); //  Token expires in 10 min ?
      setUserPlantListNeedsHydration(true);
      setWateringEventListNeedsHydration(true);
    } catch (error) {
      console.log('logIn', error);
      if (error == 'Error: Authentication failed due bad password') {
        Alert.alert('Incorrect password');
      } else if (error == 'Error: Authentication failed due bad username') {
        Alert.alert('Username is not available');
      }
    }
  };

  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.wrapper}>
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
              inputContainerStyle={styles.input}
              inputStyle={{
                color: colors.primary800,
                fontFamily: fontFamily.regular,
              }}
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
              inputContainerStyle={styles.input}
              inputStyle={{
                color: colors.primary800,
                fontFamily: fontFamily.regular,
              }}
            />
          )}
          name="password"
        />
        <Button
          title="Sign in!"
          onPress={handleSubmit(logIn)}
          buttonStyle={styles.button}
          titleStyle={{fontFamily: fontFamily.regular}}
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
  },
  header: {
    fontWeight: 'medium',
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: 50,
    color: colors.primary700,
    fontFamily: fontFamily.regular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAF1EA',
    padding: 8,
    borderRadius: 8,
    fontFamily: fontFamily.regular,
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

export default LoginForm;
