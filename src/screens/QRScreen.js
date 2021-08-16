import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the QRScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRScreen;
