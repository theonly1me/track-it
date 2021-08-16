import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const ListItem = ({ label, name, onPress }) => {
  return (
    <DrawerItem
      label={label}
      icon={({ color, size }) => <Icon name={name} color={color} size={size} />}
      onPress={onPress}
    />
  );
};

export default ListItem;
