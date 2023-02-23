import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/colors';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = React.useContext(MainContext);
  const {getUserByToken} = useUser();

  const [toggleForm, setToggleForm] = React.useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('no valid token available');
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={{flex: 1}}
          activeOpacity={1}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            {toggleForm ? <LoginForm /> : <RegisterForm />}
            <Button
              title={
                toggleForm
                  ? `Don't have an account yet? Register!`
                  : 'Already have an account? Login!'
              }
              onPress={() => {
                setToggleForm(!toggleForm);
              }}
              buttonStyle={styles.button}
              type="clear"
              titleStyle={{color: colors.primary700}}
            />
            {toggleForm && (
              <Button
                title="Forgot your password?"
                buttonStyle={styles.button}
                type="clear"
                titleStyle={{color: colors.primary700}}
              />
            )}
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    padding: 8,
    borderRadius: 8,
    height: 50,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
