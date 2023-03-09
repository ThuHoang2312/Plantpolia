/* eslint-disable camelcase */
import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Text} from '@rneui/themed';
import {MainProvider} from './src/contexts/MainContext';
import Navigator from './src/navigators/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApi} from './src/hooks/ApiHooks';
import {applicationPrefixId} from './src/utils/variables';
import {safeJsonParse} from './src/utils/safeJsonParse';
import {fetchMediaListComments} from './src/hooks/useUserPlantWateringEvent';
import {useLogger} from './src/services/useLogger';
import {fetchUserPlantList} from './src/hooks/useUserPlantHooks';
import {fetchPrimaryPlantList} from './src/hooks/usePrimaryPlantHooks';
import {showToast} from './src/utils/Toast';
import LottieIcons from './src/components/LottieIcons/LottieIcons';
import {
  Lato_100Thin,
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from '@expo-google-fonts/lato';
import {fontFamily} from './src/utils/sizes';

const USER_TOKEN_STORAGE_KEY = `${applicationPrefixId}.user.token`;
const USER_PROFILE_STORAGE_KEY = `${applicationPrefixId}.user.profile`;
const EXPIRATION_DATE_STORAGE_KEY = `${applicationPrefixId}.user.token.expiration`;

const App = () => {
  const {log} = useLogger('App');
  const {getDetailedMediaListByTagName, getMediaCommentsById} = useApi();

  const [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_400Regular,
    Lato_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [storageUserProfile, setStorageUserProfile] = useState(null);
  const [storageAccessToken, setStorageAccessToken] = useState(null);
  const [storageExpirationDate, setStorageExpirationDate] = useState(null);
  const [defaultPrimaryPlantList, setDefaultPrimaryPlantList] = useState([]);
  const [defaultUserPlantList, setDefaultUserPlantList] = useState([]);
  const [defaultWateringEventList, setDefaultWateringEventList] = useState([]);

  useEffect(() => {
    if (appIsReady) {
      return;
    }

    async function prepare() {
      try {
        {
          const userToken = await AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY);
          setStorageAccessToken(userToken ?? null);
        }

        const userProfile = await AsyncStorage.getItem(
          USER_PROFILE_STORAGE_KEY
        );

        const parsedUserProfile = safeJsonParse(userProfile);
        setStorageUserProfile(parsedUserProfile);

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
        {
          const items = await fetchPrimaryPlantList({
            getDetailedMediaListByTagName,
            log,
          });
          setDefaultPrimaryPlantList(items);
        }
        {
          if (parsedUserProfile) {
            const list = await fetchUserPlantList({
              getDetailedMediaListByTagName,
              log,
              userId: parsedUserProfile.user_id.toString(),
            });
            setDefaultUserPlantList(list);
          }
        }
        {
          const list = await fetchMediaListComments({
            userPlantList: defaultUserPlantList,
            log,
            getMediaCommentsById,
          });

          setDefaultWateringEventList(list);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    //  Take minimum 1 second even if data was loaded faster. (Just for Hype :D)
    Promise.all([
      prepare(),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ])
      .then(() => {
        setAppIsReady(true);
      })
      .catch((err) => {
        showToast(
          `Data loading failed. Please check your internet connection and try again. ${err?.message}`,
          'Startup error'
        );
        setAppIsReady(true);
      });
  }, [appIsReady]);

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

  if (!fontsLoaded) {
    return null;
  }

  if (!appIsReady) {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onLayout={onLayoutRootView}
      >
        <Text style={styles.logo}>Plantpolia</Text>
        <LottieIcons iconName="WalkingPlant" focused autoPlay loop />
      </View>
    );
  }

  return (
    <MainProvider
      userProfile={storageUserProfile}
      accessToken={storageAccessToken}
      expirationDate={storageExpirationDate}
      defaultPrimaryPlantList={defaultPrimaryPlantList}
      defaultUserPlantList={defaultUserPlantList}
      defaultWateringEventList={defaultWateringEventList}
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
const styles = StyleSheet.create({
  logo: {
    fontFamily: fontFamily.thin,
    bottom: 200,
    fontSize: 55,
    textAlign: 'center',
    display: 'flex',
  },
});

export default App;
