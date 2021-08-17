import { Dimensions, Platform, StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_WHITE } from './Utils';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: COLOR_WHITE,
  },
  containerView: { flex: 1 },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4', //light-grey
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  profileDetails: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  copyright: {
    alignSelf: 'center',
    marginBottom: 15,
  },
});

const { height: dimensions } = Dimensions.get('screen');
const logo_dimensions = dimensions * 0.28;

export const loginSplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: logo_dimensions,
    height: logo_dimensions,
  },
  logoContainer: {
    backgroundColor: COLOR_WHITE,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 100,
  },
  title: {
    color: '#00cec9', //'#636e72',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  text: {
    fontSize: 20,
    color: 'grey',
    marginTop: 20,
    alignSelf: 'center',
  },
  quote: {
    color: '#636e72',
    fontSize: 16,
    alignSelf: 'flex-end',
    bottom: 10,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 200,
    height: 50,
    marginTop: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textSign: {
    color: COLOR_WHITE,
    fontSize: 20,
  },
});

export const signInScreenStyles = StyleSheet.create({
  textSign: {
    fontSize: 18,
    color: COLOR_WHITE,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#00cec9',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  text_footer: {
    color: '#00cec9',
    fontSize: 18,
  },
  text_header: {
    color: COLOR_WHITE,
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
  },
  errorMsg: {
    color: 'red',
  },
});

export default styles;
