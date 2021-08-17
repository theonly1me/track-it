export const COLOR_PRIMARY = '#55efc4';
export const COLOR_WHITE = '#fff';

export const screenOptions = darkMode => {
  return {
    headerStyle: {
      backgroundColor: darkMode ? '#2d3436' : COLOR_PRIMARY,
    },
    headerTintColor: '#fff',
    drawerBackgroundColor: COLOR_PRIMARY,
  };
};

export const headerOptions = () => {
  return {
    title: 'Track.it',
  };
};
