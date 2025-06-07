import React from 'react';
import { View, Image } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../../Theme/ThemeContext';

interface TabIconProps {
  focused: boolean;
  color: string;
  iconSource: string | ReturnType<typeof require>;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, color, iconSource }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.activeCircle} />}
      <Image source={iconSource} style={[styles.icon, { tintColor: color }]} />
    </View>
  );
};

export default TabIcon;
