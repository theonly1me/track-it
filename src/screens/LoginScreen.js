import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { signInScreenStyles as styles } from '../Utils/AppStyles';
import { COLOR_PRIMARY } from '../Utils/Utils';

import { AuthContext } from '../Utils/Context';
import { useTheme } from '@react-navigation/native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState({
    secureTextEntry: true,
  });

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const { colors } = useTheme();

  const initialValues = { email: '', password: '' };

  //validation with YUP
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().trim().min(7, 'Invalid Password'),
  });

  const { login } = useContext(AuthContext);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = (username, password) => {
    db.collection('Users')
      .where('Email', '==', username)
      .where('Password', '==', password)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          login(username, doc.data());
        });
      });
  };

  const handlePOSLogin = (username, password) => {
    db.collection('PointOfSale')
      .where('posID', '==', username)
      .where('password', '==', password)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          navigation.navigate('POSScreen', { pos: data, id: doc.id });
        });
      });
  };

  const handleLogisticsLogin = (username, password) => {
    if (username === 'logi@co.sg' && password === 'pass123') {
      navigation.navigate('AllReturns');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, handleChange, touched, handleBlur }) => {
        const { email, password } = values;
        return (
          <View style={styles.container}>
            <StatusBar
              backgroundColor={COLOR_PRIMARY}
              barStyle="light-content"
            />
            <View style={styles.header}>
              <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
              animation="fadeInUpBig"
              style={[styles.footer, { backgroundColor: colors.background }]}
            >
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>
                <Icon name="mail-outline" size={25} color={colors.text} />
                <TextInput
                  value={email}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.text}
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {(touched.email && errors.email) || !touched.email ? (
                  <Animatable.View animation="bounceIn">
                    <Icon name="close-circle-outline" size={25} color="gray" />
                  </Animatable.View>
                ) : (
                  <Animatable.View animation="bounceIn">
                    <Icon
                      name="checkmark-circle-outline"
                      size={25}
                      color={COLOR_PRIMARY}
                    />
                  </Animatable.View>
                )}
              </View>
              <Text style={[styles.text_footer, { marginTop: 35 }]}>
                Password
              </Text>
              <View style={styles.action}>
                <Icon name="key-outline" size={25} color={colors.text} />
                <TextInput
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.text}
                  secureTextEntry={data.secureTextEntry}
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Icon name="eye-off-outline" size={25} color="grey" />
                  ) : (
                    <Icon name="eye-outline" size={25} color={COLOR_PRIMARY} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid Password</Text>
                </Animatable.View>
              )}
              <View style={{ marginTop: 50 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLogin(email, password)}
                >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('SignUpScreen')}
                >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>Sign up</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePOSLogin(email, password)}
                  >
                    <LinearGradient
                      colors={['#fff', '#fff']}
                      style={styles.signInPOS}
                    >
                      <Text style={styles.textSignPOS}>POS</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLogisticsLogin(email, password)}
                  >
                    <LinearGradient
                      colors={['#fff', '#fff']}
                      style={styles.signInLogistics}
                    >
                      <Text style={styles.textSignPOS}>Logistics</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          </View>
        );
      }}
    </Formik>
  );
};

export default LoginScreen;
