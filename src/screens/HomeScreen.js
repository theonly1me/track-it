import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeStyles as styles } from '../Utils/AppStyles';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const { colors, dark } = useTheme();
  const [loggedInUser, setLoggedInUser] = useState();
  AsyncStorage.getItem('user').then(user => setLoggedInUser(JSON.parse(user)));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.text_header_credits]}>
            {loggedInUser?.Credits}
          </Text>
          <Text style={styles.text_header}>Credits Remaining</Text>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <View>
          <Text style={[styles.nearest, { color: colors.text }]}>
            Nearest Certified Partner
          </Text>
          <View style={styles.nearestPOS}>
            <Text style={styles.nearestName}>Stories</Text>
            <Text style={styles.nearestAddr}>
              1 Circular Rd, Singapore 049357
            </Text>
            <Text style={styles.phone}>TEL: +63 9801764789</Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default HomeScreen;
