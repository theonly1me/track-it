import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { loginSplashScreenStyles as styles } from '../Utils/AppStyles';
import { COLOR_WHITE } from '../Utils/Utils';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const SplashAnimationScreen = ({ navigation }) => {
  const { colors, dark } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View
          animation="bounceInDown"
          easing="ease-in"
          style={styles.logoContainer}
        >
          <Animatable.Image
            animation="bounceInDown"
            easing="ease-in"
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/Track.it-logo.png')}
          />
        </Animatable.View>
      </View>
      <Animatable.View
        style={[styles.footer, { backgroundColor: colors.background }]}
        animation="fadeInUpBig"
      >
        <Text style={styles.title}>
          &quot;The greatest threat to our planet is the belief that someone
          else will save it&quot;
        </Text>
        <Text style={styles.quote}>- Robert Swan</Text>
        <Text style={styles.text}>Start contributing today!</Text>
        <Text style={{ fontSize: 32, textAlign: 'center' }}>🌱</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text style={styles.textSign}>Get Started</Text>
            <Icon
              name="chevron-forward"
              color={COLOR_WHITE}
              size={25}
              style={{ marginLeft: 10 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default SplashAnimationScreen;
