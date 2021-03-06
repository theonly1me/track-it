import React, { useContext, useState } from 'react';
import { Linking, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import ListItem from '../components/ListItem';
import styles from '../Utils/AppStyles';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { AuthContext } from '../Utils/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerScreen = props => {
  const {
    navigation: { navigate },
  } = props;
  const [loggedInUser, setLoggedInUser] = useState();
  AsyncStorage.getItem('user').then(user => setLoggedInUser(JSON.parse(user)));
  const paperTheme = usePaperTheme();

  const { logout, toggleTheme } = useContext(AuthContext);

  return (
    <View style={styles.containerView}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.profileContainer}>
              <Avatar.Image
                source={{
                  uri: `${loggedInUser?.profilePic}`,
                  size: 50,
                }}
              />
              <View style={styles.profileDetails}>
                <Title style={styles.title}>{loggedInUser?.Name}</Title>
                <Caption style={styles.caption}>{`@${loggedInUser?.Name.split(
                  ' '
                )[0].toLowerCase()}${new Date().getUTCFullYear()}`}</Caption>
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
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text>Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <ListItem
          label="Logout"
          name="log-out-outline"
          onPress={() => logout()}
        />
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
