import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import images from '../Utils/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { qrScreenStyles as styles } from '../Utils/AppStyles';

const QRScreen = () => {
  const { colors, dark } = useTheme();
  // const [loggedInUser, setLoggedInUser] = useState(null);
  // const [imageUrl, setImageUri] = useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('user').then(user =>
  //     setLoggedInUser(JSON.parse(user))
  //   );
  // }, []);

  // useEffect(() => {
  //   if (loggedInUser) setImageUri(loggedInUser.userID);
  // }, [loggedInUser]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.text_header}>
            Please scan your QR Code to earn credits
          </Text>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <View style={styles.qrImageContainer}>
          <Image
            style={{ width: 250, height: 250 }}
            source={images['emily-qrcode'].uri}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default QRScreen;
