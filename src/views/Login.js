import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useApi} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/colors';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setUser, token} = React.useContext(MainContext);
  const {getUserByToken} = useApi();

  const [toggleForm, setToggleForm] = React.useState(true);

  const checkToken = async () => {
    try {
      if (token === null) return;
      const userData = await getUserByToken(token);
      console.log('checkToken', userData);
      setUser(userData);
    } catch (error) {
      console.log('no valid token available');
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
