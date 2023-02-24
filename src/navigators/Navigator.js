import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {MainContext} from '../contexts/MainContext';
import {Icon} from '@rneui/themed';
import AddPlant from '../views/AddPlant';
import Login from '../views/Login';
import Upload from '../views/Upload';
import {ExpiredToken} from '../views/ExpiredToken';
import {UploadCompleted} from '../views/UploadCompleted';
import {WateringProcess} from '../views/WateringProcess';
import {WateringProcessStarted} from '../views/WateringProcessStarted';
import {WateringProcessFinished} from '../views/WateringProcessFinished';
import {colors} from '../utils/colors';
import SuggestPlant from '../views/SuggestPlant';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: colors.primary50,
  },
};

const TabScreen = () => {
  return (
    <Tab.Navigator {...{screenOptions}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color={colors.primary700} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Plant"
        component={AddPlant}
        options={{
          tabBarIcon: () => (
            <Icon
              type="material"
              name="add-circle-outline"
              color={colors.primary700}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Icon name="person" color={colors.primary700} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn, isExpired} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="WateringProcess" component={WateringProcess} />
          <Stack.Screen
            name="WateringProcessStarted"
            component={WateringProcessStarted}
            options={({navigation}) => ({
              headerBackVisible: false,
              gestureEnabled: false,
              headerLeft: () => (
                <WateringProcessStarted.HeaderLeft navigation={navigation} />
              ),
            })}
          />

          <Stack.Screen
            name="WateringProcessFinished"
            component={WateringProcessFinished}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen name="Upload" component={Upload} />
          <Stack.Screen
            name="UploadCompleted"
            component={UploadCompleted}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="SuggestPlant" component={SuggestPlant} />
        </>
      ) : isExpired ? (
        <>
          <Stack.Screen
            name="ExpiredToken"
            component={ExpiredToken}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
