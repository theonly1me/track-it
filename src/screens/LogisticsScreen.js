import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginSplashScreenStyles as styles } from '../Utils/AppStyles';
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

const LogisticsScreen = props => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const { pos } = props.route.params;

  const handleOnPress = () => {
    db.collection('PointOfSale')
      .where('posID', '==', pos.posID)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          db.collection('PointOfSale').doc(doc.id).update({
            Address: pos.Address,
            Name: pos.Name,
            TotalReturnableBottles: 0,
            hasScheduledReturns: false,
            password: pos.password,
            posID: pos.posID,
          });
        });
      });
    props.navigation.navigate('AllReturns');
  };
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40%',
        width: 350,
        height: 400,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOpacity: 0.2,
        shadowOffset: { width: 5, height: 5 },
      }}
    >
      <Text style={{ fontSize: 24 }}>{pos.Name}</Text>
      <Text style={{ fontSize: 20 }}>
        Total Returnable Bottles: {pos.TotalReturnableBottles}
      </Text>
      <Text style={{ fontSize: 18 }}>Address: {pos.Address}</Text>
      <TouchableOpacity style={styles.button}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
          <Text style={styles.textSign} onPress={handleOnPress}>
            Accept Order
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default LogisticsScreen;
