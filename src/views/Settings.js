import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, ListItem} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';
import {useNotificationStatus} from '../services/useNotificationStatus';

const Settings = ({navigation}) => {
  const {setUser, setExpirationDate, setToken} = React.useContext(MainContext);
  const {
    canAskForNotificationPermission,
    isNotificationsGranted,
    requestNotificationPermissions,
  } = useNotificationStatus();
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <ListItem
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={styles.listItem}
            bottomDivider
          >
            <Avatar
              rounded
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 45,
                color: colors.primary400,
              }}
            />
            <ListItem.Title style={styles.title}>Profile</ListItem.Title>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            onPress={() => {
              navigation.navigate('EditPassword');
            }}
            style={styles.listItem}
            bottomDivider
          >
            <Avatar
              rounded
              icon={{
                name: 'key',
                type: 'font-awesome',
                size: 30,
                color: colors.primary400,
              }}
            />
            <ListItem.Title style={styles.title}>
              Change password
            </ListItem.Title>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            onPress={() => {
              navigation.navigate('AboutPlantpolia');
            }}
            style={styles.listItem}
            bottomDivider
          >
            <Avatar
              rounded
              icon={{
                name: 'leaf',
                type: 'font-awesome',
                size: 30,
                color: colors.primary400,
              }}
            />
            <ListItem.Title style={styles.title}>
              About Plantpolia
            </ListItem.Title>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            onPress={() => {
              navigation.navigate('TermsAndConditions');
            }}
            style={styles.listItem}
            bottomDivider
          >
            <Avatar
              rounded
              icon={{
                name: 'book',
                type: 'font-awesome',
                size: 30,
                color: colors.primary400,
              }}
            />
            <ListItem.Title style={styles.title}>
              Terms and Policies
            </ListItem.Title>
            <ListItem.Chevron />
          </ListItem>
          {canAskForNotificationPermission && !isNotificationsGranted && (
            <Button
              title="Allow notifications"
              buttonStyle={styles.editButton}
              titleStyle={{color: colors.primary700, fontWeight: 'bold'}}
              onPress={() => {
                requestNotificationPermissions();
              }}
            />
          )}
        </View>
        <Button
          title="Logout!"
          onPress={async () => {
            console.log('Loggin out');
            setUser(null);
            setExpirationDate(null);
            setToken(null);
          }}
          buttonStyle={styles.logoutButton}
          titleStyle={{fontWeight: 'bold'}}
        />
      </ScrollView>
    </View>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  title: {
    color: colors.primary600,
    fontSize: 25,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    padding: 20,
  },
  listItem: {
    width: '100%',
    padding: 20,
    alignContent: 'stretch',
  },
});

export default Settings;
