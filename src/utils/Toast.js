import {Platform, ToastAndroid} from 'react-native';
import AlertIOS from 'react-native/Libraries/Alert/Alert';

export const showToast = (message, title = '') => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(title, message);
  }
};
