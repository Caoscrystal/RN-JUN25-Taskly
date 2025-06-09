import { ThemeType } from '../../Theme/theme';
import { StyleSheet, ViewStyle } from 'react-native';

interface TabNavigatorStyles {
  tabBarStyle: ViewStyle;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarHideOnKeyboard: boolean;
  tabBarShowLabel: boolean;
  tabBarIconStyle: ViewStyle;
}

const getStyles = (theme: ThemeType): TabNavigatorStyles => {
  const tabComponentStyles = StyleSheet.create({
    bar: {
      position: 'absolute',
      backgroundColor: theme.Bottomtab,
      borderTopWidth: 0,
      elevation: 0,
      height: 80,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
  });

  return{
    tabBarStyle: tabComponentStyles.bar,
    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: '#5B3CC4',
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarIconStyle: { marginTop: 20 },
  };

};
export default getStyles;
