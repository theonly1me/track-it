import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLOR_PRIMARY } from '../Utils/Options';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the LoginScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
