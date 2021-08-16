import React, { useState } from 'react';
import { Linking, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import ListItem from '../components/ListItem';
import styles from '../Utils/AppStyles';

const DrawerScreen = props => {
  const {
    navigation: { navigate },
  } = props;
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };
  return (
    <View style={styles.containerView}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.profileContainer}>
              <Avatar.Image
                source={{
                  uri: 'https://source.unsplash.com/featured/?portrait,female,face,professional',
                  size: 50,
                }}
              />
              <View style={styles.profileDetails}>
                <Title style={styles.title}>Lauren H.</Title>
                <Caption style={styles.caption}>@itsmelo</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <ListItem
              label="Home"
              name="home-outline"
              onPress={() => navigate('Home')}
            />
            <ListItem
              label="QR Code"
              name="qr-code-outline"
              onPress={() => navigate('QR')}
            />
          </Drawer.Section>
          <Drawer.Section title="Settings">
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.preference}>
                <Text>Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkMode} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <ListItem label="Sign Out" name="log-out-outline" onPress={() => {}} />
        <ListItem
          label="Support"
          name="md-people-outline"
          onPress={() => {
            Linking.openURL('mailto:help@track.it');
          }}
        />
      </Drawer.Section>
      <Caption style={styles.copyright}>&copy; 2021 Track.it Co. Ltd.</Caption>
    </View>
  );
};

export default DrawerScreen;
