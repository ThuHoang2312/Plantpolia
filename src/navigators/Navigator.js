import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {MainContext} from '../contexts/MainContext';
import {Icon} from '@rneui/themed';
import AddPlant from '../views/AddPlant';
import Search from '../views/Search';
import Login from '../views/Login';
import {WateringProcess} from '../views/WateringProcess';
import {WateringProcessStarted} from '../views/WateringProcessStarted';
import {WateringProcessFinished} from '../views/WateringProcessFinished';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="AddPlant"
        component={AddPlant}
        options={{
          tabBarIcon: ({color}) => <Icon name="cloud-upload" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => <Icon name="search" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
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
