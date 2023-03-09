import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useApi} from '../hooks/ApiHooks';
import {Button, Input, Text} from '@rneui/themed';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {MainContext} from '../contexts/MainContext';

const EditPassword = ({navigation}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });
  const {putUser} = useApi();
  const {token} = React.useContext(MainContext);

  const editPassword = async (editData) => {
    console.log('editing: ', editData);
    delete editData.confirmPassword;
    try {
      const editPasswordResult = await putUser(editData, token);
      if (editPasswordResult)
        Alert.alert('Success', 'Password updated!', [{text: 'OK'}]);
      console.log('edit password result: ', editPasswordResult);
    } catch (error) {
      console.error('editPassword', error);
      Alert.alert('Error', 'Error occurs, please try again!', [{text: 'OK'}]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Update Password</Text>
      <Controller
        control={control}
        rules={{
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'Min 5 characters, needs one number, one uppercase letter',
          },
          required: {value: true, message: 'This is required.'},
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
            inputStyle={{color: colors.primary700}}
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
          required: {value: true, message: 'This is required.'},
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
              errors.confirmPassword && errors.confirmPassword.message
            }
            inputContainerStyle={styles.input}
            inputStyle={{color: colors.primary700}}
          />
        )}
        name="confirmPassword"
      />
      <Button
        title="Update password!"
        onPress={handleSubmit(editPassword)}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

EditPassword.propTypes = {
  navigation: PropTypes.object,
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

export default EditPassword;
