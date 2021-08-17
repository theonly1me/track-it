import React, { useState } from 'react';
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
import { signInScreenStyles as styles } from '../Utils/AppStyles';
import { COLOR_PRIMARY } from '../Utils/Utils';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = useState({
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });

  const { colors } = useTheme();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().trim().min(7, 'Invalid Password'),
    confirmPassword: Yup.string().equals(
      [Yup.ref('password'), null],
      "The Passwords don't match"
    ),
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {({ errors, touched, values, handleChange, handleBlur }) => {
        const { email, password, confirmPassword } = values;
        return (
          <View style={styles.container}>
            <StatusBar
              backgroundColor={COLOR_PRIMARY}
              barStyle="light-content"
            />
            <View style={styles.header}>
              <Text style={styles.text_header}>Register now!</Text>
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
              <Text style={[styles.text_footer, { marginTop: 35 }]}>
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Icon name="key-outline" size={25} color={colors.text} />
                <TextInput
                  value={confirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor={colors.text}
                  secureTextEntry={data.confirmSecureTextEntry}
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange('confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {data.confirmSecureTextEntry ? (
                    <Icon name="eye-off-outline" size={25} color="grey" />
                  ) : (
                    <Icon name="eye-outline" size={25} color={COLOR_PRIMARY} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Passwords do not match!</Text>
                </Animatable.View>
              )}
              <View style={{ marginTop: 50 }}>
                <TouchableOpacity style={styles.button}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>Sign up</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.goBack()}
                >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>Back to Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignUpScreen;
