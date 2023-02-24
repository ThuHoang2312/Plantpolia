import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Text} from '@rneui/themed';
import {MainProvider} from './src/contexts/MainContext';
import Navigator from './src/navigators/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_STORAGE_KEY = 'userToken';
const USER_PROFILE_STORAGE_KEY = 'userProfile';
const EXPIRATION_DATE_STORAGE_KEY = 'expirationDate';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [storageUserProfile, setStorageUserProfile] = useState(null);
  const [storageAccessToken, setStorageAccessToken] = useState(null);
  const [storageExpirationDate, setStorageExpirationDate] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        {
          const userToken = await AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY);
          setStorageAccessToken(userToken ?? null);
        }

        {
          const userProfile = await AsyncStorage.getItem(
            USER_PROFILE_STORAGE_KEY
          );
          setStorageUserProfile(userProfile ? JSON.parse(userProfile) : null);
        }

        {
          const expirationDate = await AsyncStorage.getItem(
            EXPIRATION_DATE_STORAGE_KEY
          );
          const parsedExpirationDate = parseInt(expirationDate);

          setStorageExpirationDate(
            expirationDate && !Number.isNaN(parsedExpirationDate)
              ? parsedExpirationDate
              : null
          );
        }
      } catch (e) {
        console.warn(e);
      }
    }

    //  Take minimum 2 seconds even if data was loaded faster. (Just for Hype :D)
    Promise.all([
      prepare(),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(() => {
      setAppIsReady(true);
    });
  }, []);

  /**
   * This tells the splash screen to hide immediately! If we call this after
   * `setAppIsReady`, then we may see a blank screen while the app is
   * loading its initial state and rendering its first pixels. So instead,
   * we hide the splash screen once we know the root view has already
   * performed layout.
   * @type {(function(): Promise<void>)|*}
   */
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (!appIsReady) {
      return;
    }
    (async () => {
      if (storageAccessToken) {
        await AsyncStorage.setItem(
          USER_TOKEN_STORAGE_KEY,
          String(storageAccessToken)
        );
      } else {
        await AsyncStorage.removeItem(USER_TOKEN_STORAGE_KEY);
      }
    })();
  }, [storageAccessToken]);

  useEffect(() => {
    if (!appIsReady) {
      return;
    }
    (async () => {
      if (storageUserProfile) {
        await AsyncStorage.setItem(
          USER_PROFILE_STORAGE_KEY,
          JSON.stringify(storageUserProfile)
        );
      } else {
        await AsyncStorage.removeItem(USER_PROFILE_STORAGE_KEY);
      }
    })();
  }, [storageUserProfile]);

  useEffect(() => {
    if (!appIsReady) {
      return;
    }
    (async () => {
      console.log('set: ', storageExpirationDate);
      if (storageExpirationDate) {
        await AsyncStorage.setItem(
          EXPIRATION_DATE_STORAGE_KEY,
          String(storageExpirationDate)
        );
      } else {
        await AsyncStorage.removeItem(EXPIRATION_DATE_STORAGE_KEY);
      }
    })();
  }, [storageExpirationDate]);

  if (!appIsReady) {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onLayout={onLayoutRootView}
      >
        <Text>SplashScreen Demo! 👋</Text>
      </View>
    );
  }

  return (
    <MainProvider
      userProfile={storageUserProfile}
      accessToken={storageAccessToken}
      expirationDate={storageExpirationDate}
      setUserProfile={(userModel) => {
        setStorageUserProfile(userModel);
      }}
      setAccessToken={(accessToken) => {
        setStorageAccessToken(accessToken);
      }}
      setExpirationDate={(expirationDate) => {
        setStorageExpirationDate(expirationDate);
      }}
    >
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
