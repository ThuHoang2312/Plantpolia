import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input, Text} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const RegisterForm = (props) => {
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
  const {postUser, checkUsername} = useUser();

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    delete registerData.confrimPassword;
    try {
      const registerResult = await postUser(registerData);
      console.log('register result: ', registerResult);
    } catch (error) {
      console.error('Register', error);
      // TODO: notify user about failed register attempt
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('checkUser', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
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
            message: 'Min 5 characters, needs one number, one uppercase letter',
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
          />
        )}
        name="full_name"
      />
      <Button
        title="Register!"
        onPress={handleSubmit(register)}
        buttonStyle={styles.button}
      />
    </Card>
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
    // fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 50,
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
  },
  wrapper: {
    flex: 1,
  },
});

export default RegisterForm;
