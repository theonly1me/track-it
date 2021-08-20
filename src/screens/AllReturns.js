import React from 'react';
import { FlatList, View } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';
import { useState } from 'react';
import Card from '../components/Card';

const AllReturns = ({ navigation }) => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const [list, setList] = useState([]);

  db.collection('PointOfSale')
    .where('hasScheduledReturns', '==', true)
    .get()
    .then(querySnapshot => {
      const posList = [];
      querySnapshot.forEach(doc => {
        posList.push(doc.data());
      });
      setList(posList);
    });
  const navCallback = pos => {
    navigation.navigate('LogisticsScreen', { pos });
  };
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        height: '100%',
        width: '90%',
        paddigTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
      }}
    >
      <FlatList
        data={list}
        keyExtractor={pos => pos.posID}
        renderItem={renderItem => (
          <Card pos={renderItem.item} navCallback={navCallback} />
        )}
      />
    </View>
  );
};

export default AllReturns;
