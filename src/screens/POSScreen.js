import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { loginSplashScreenStyles as styles } from '../Utils/AppStyles';
import { useTheme } from '@react-navigation/native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const POSScreen = props => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [input, setInput] = useState(0);
  const [code, setCode] = useState(null);
  const [returns, setReturns] = useState(false);

  const { pos } = props.route.params;

  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCode(data);
  };

  const handleInputChange = val => {
    setInput(Number.parseInt(val));
  };

  const handleButtonPress = () => {
    db.collection('Users')
      .where('UserID', '==', code)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const user = doc.data();
          db.collection('Users')
            .doc(doc.id)
            .update({
              Credits: (Number.parseInt(user.Credits) + input * 10).toString(),
              Email: user.Email,
              Name: user.Name,
              Password: user.Password,
              UserID: user.UserID,
              profilePic: user.profilePic,
            });
        });
      });

    db.collection('PointOfSale')
      .where('posID', '==', pos.posID)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const pos = doc.data();
          db.collection('PointOfSale')
            .doc(doc.id)
            .update({
              Address: pos.Address,
              Name: pos.Name,
              TotalReturnableBottles: Number.parseInt(
                +pos.TotalReturnableBottles + +input
              ).toString(),
              hasScheduledReturns: false,
              password: pos.password,
              posID: pos.posID,
            });
        });
      });
  };

  const handleScheduleReturns = () => {
    db.collection('PointOfSale')
      .where('posID', '==', pos.posID)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const pos = doc.data();
          db.collection('PointOfSale').doc(doc.id).update({
            Address: pos.Address,
            Name: pos.Name,
            TotalReturnableBottles: pos.TotalReturnableBottles,
            hasScheduledReturns: true,
            password: pos.password,
            posID: pos.posID,
          });
        });
      });
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: '#fff',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[{ width: 300, height: 300, alignSelf: 'center' }]}
        />
        <Text style={{ alignSelf: 'center' }}>The QR Value is: {code}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ color: colors.text, fontSize: 20 }}>
          Number of Bottles:
        </Text>
        <View style={styles.action}>
          <TextInput
            style={{
              borderWidth: 1,
              backgroundColor: '#fff',
              width: 200,
              height: 50,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={styles.textSign} onPress={handleButtonPress}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {scanned && (
        <TouchableOpacity style={[styles.button, { marginTop: 20 }]}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text style={styles.textSign} onPress={() => setScanned(false)}>
              Scan Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {!returns && (
        <View style={{ marginTop: 30 }}>
          <Button
            onPress={() => {
              handleScheduleReturns();
            }}
            title="Schedule Returns"
          />
        </View>
      )}
    </View>
  );
};

export default POSScreen;
