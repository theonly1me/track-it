//libraries
import React, { useEffect, useReducer, useMemo, useState } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';

//screens
import DrawerScreen from './src/screens/DrawerScreen';
import HomeScreen from './src/screens/HomeScreen';
import QRScreen from './src/screens/QRScreen';

//options
import { screenOptions, headerOptions } from './src/Utils/Utils';
import RootStackScreen from './src/screens/RootStackScreen';
import { ActivityIndicator, View } from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

//state - context
import { AuthContext } from './src/Utils/Context';
//front-end persistance
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  let [loadedFonts] = useFonts({
    Courgette_400Regular,
  });
  const [isDarkMode, setDarkMode] = useState(false);

  const CustomDefaultTheme = {
    ...DefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...PaperDarkTheme.colors,
      text: '#fff',
    },
  };

  const theme = isDarkMode ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'LOGGEDIN':
        return {
          ...state,
          userToken: action.payload.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...state,
          username: action.payload.id,
          userToken: action.payload.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return { ...state, username: null, userToken: null };
      case 'SIGNUP':
        return {
          ...state,
          username: action.payload.id,
          userToken: action.payload.token,
          isLoading: false,
        };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(loginReducer, {
    isLoading: true,
    username: null,
    userToken: null,
  });

  const authContext = useMemo(
    () => ({
      async login(username, loginUser) {
        let userToken = null;

        if (loginUser) {
          try {
            userToken = username.slice(3, 5) + new Date().toISOString();
            await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem('user', JSON.stringify(loginUser));
          } catch (e) {
            console.error(e);
          }
          dispatch({
            type: 'LOGIN',
            payload: { id: username, token: userToken },
          });
        }
      },
      async logout() {
        dispatch({ type: 'LOGOUT' });
        try {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.error(e);
        }
      },
      signUp() {},
      toggleTheme() {
        setDarkMode(darkMode => !darkMode);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({
        type: 'SIGNUP',
        payload: { token: userToken },
      });
    }, 1000);
  }, []);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {state.userToken === null ? (
            <RootStackScreen />
          ) : (
            <Drawer.Navigator
              drawerContent={props => <DrawerScreen {...props} />}
              initialRouteName="Login"
              screenOptions={{
                ...screenOptions(isDarkMode),

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
              <Drawer.Screen
                name="QR"
                component={QRScreen}
                options={headerOptions}
              />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
