import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Text} from '@rneui/themed';
import {MainProvider} from './src/contexts/MainContext';
import Navigator from './src/navigators/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApi} from './src/hooks/ApiHooks';
import {
  applicationPrefixId,
  primaryPlantTagName,
  requestedPlantTagName,
  userPlantTagName,
} from './src/utils/variables';

const USER_TOKEN_STORAGE_KEY = `${applicationPrefixId}.user.token`;
const USER_PROFILE_STORAGE_KEY = `${applicationPrefixId}.user.profile`;
const EXPIRATION_DATE_STORAGE_KEY = `${applicationPrefixId}.user.token.expiration`;

const App = () => {
  const {getDetailedMediaListByTagName} = useApi();
  const [appIsReady, setAppIsReady] = useState(false);
  const [storageUserProfile, setStorageUserProfile] = useState(null);
  const [storageAccessToken, setStorageAccessToken] = useState(null);
  const [storageExpirationDate, setStorageExpirationDate] = useState(null);
  const [defaultPrimaryPlantList, setDefaultPrimaryPlantList] = useState([]);
  const [defaultUserPlantList, setDefaultUserPlantList] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        {
          const userToken = await AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY);
          setStorageAccessToken(userToken ?? null);
        }

        const userProfile = await AsyncStorage.getItem(
          USER_PROFILE_STORAGE_KEY
        );

        const parsedUserProfile = userProfile ? JSON.parse(userProfile) : null;
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
          const items = await getDetailedMediaListByTagName(
            primaryPlantTagName
          );
          setDefaultPrimaryPlantList(items);
        }
        {
          if (parsedUserProfile) {
            const items = await getDetailedMediaListByTagName(userPlantTagName);
            const media = items.filter(
              (file) => file && file.user_id === parsedUserProfile.user_id
            );
            setDefaultUserPlantList(media);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }

    //  Take minimum 1 second even if data was loaded faster. (Just for Hype :D)
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
        <View style={styles.container}>
          <View style={styles.debugItem}>
            <Text style={styles.itemTitle}>applicationPrefixId</Text>
            <Text style={styles.item}>{applicationPrefixId}</Text>
          </View>
          <View style={styles.debugItem}>
            <Text style={styles.itemTitle}>primaryPlantTagName</Text>
            <Text style={styles.item}>{primaryPlantTagName}</Text>
          </View>
          <View style={styles.debugItem}>
            <Text style={styles.itemTitle}>userPlantTagName</Text>
            <Text style={styles.item}>{userPlantTagName}</Text>
          </View>
          <View style={styles.debugItem}>
            <Text style={styles.itemTitle}>requestedPlantTagName</Text>
            <Text style={styles.item}>{requestedPlantTagName}</Text>
          </View>
        </View>
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
  container: {
    width: '100%',
  },
  debugItem: {
    width: '100%',
    paddingVertical: 10,
  },
  itemTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    textAlign: 'center',
  },
});

export default App;
