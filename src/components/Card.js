import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR_PRIMARY } from '../Utils/Utils';

const Card = ({ pos, navCallback }) => {
  return (
    <View
      style={{
        margin: 20,
        padding: 20,
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        display: 'flex',
        shadowOpacity: '0.2',
        shadowOffset: { width: 5, height: 5 },
      }}
    >
      <TouchableOpacity onPress={() => navCallback(pos)}>
        <Text style={{ fontSize: 25, color: 'gray' }}>{pos.Name}</Text>
        <Text
          style={{ color: COLOR_PRIMARY, fontWeight: 'bold', fontSize: 18 }}
        >
          Bottles to return: {pos.TotalReturnableBottles}
        </Text>
        <Icon
          name="chevron-forward"
          size={25}
          color={COLOR_PRIMARY}
          style={{ alignSelf: 'flex-end' }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Card;
