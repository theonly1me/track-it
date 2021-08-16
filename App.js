//libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';

//screens
import DrawerScreen from './src/screens/DrawerScreen';
import HomeScreen from './src/screens/HomeScreen';
import QRScreen from './src/screens/QRScreen';
import LoginScreen from './src/screens/LoginScreen';

//options
import { screenOptions, headerOptions } from './src/Utils/Options';
import Loader from './src/components/Loader';

const Drawer = createDrawerNavigator();

const App = () => {
  let [loadedFonts] = useFonts({
    Courgette_400Regular,
  });
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerScreen {...props} />}
        initialRouteName="Login"
        screenOptions={{
          ...screenOptions(),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Courgette_400Regular',
            fontSize: 32,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={headerOptions}
        />
        <Drawer.Screen name="QR" component={QRScreen} options={headerOptions} />
        <Drawer.Screen
          name="Login"
          component={loadedFonts ? LoginScreen : Loader}
          options={headerOptions}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
