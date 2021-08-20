import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashAnimationScreen from './SplashAnimationScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import POSScreen from './POSScreen';
import LogisticsScreen from './LogisticsScreen';
import AllReturns from './AllReturns';
import { COLOR_PRIMARY } from '../Utils/Utils';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="SplashScreen" component={SplashAnimationScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen
        name="POSScreen"
        component={POSScreen}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerBackTitle: 'Logout',
          headerTitle: 'TrackIt',
          headerTintColor: COLOR_PRIMARY,
        }}
      />
      <RootStack.Screen
        name="LogistisScreen"
        component={LogisticsScreen}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerBackTitle: 'Logout',
          headerTitle: 'TrackIt',
          headerTintColor: COLOR_PRIMARY,
        }}
      />
      <RootStack.Screen
        name="AllReturns"
        component={AllReturns}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerBackTitle: 'Logout',
          headerTitle: 'TrackIt',
          headerTintColor: COLOR_PRIMARY,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
