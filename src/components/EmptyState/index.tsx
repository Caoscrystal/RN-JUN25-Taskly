import React from 'react';
import {View, Text, Image} from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

const EmptyState: React.FC = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SadFace.png')}
        resizeMode="contain"
      />
      <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>
    </View>
  );
};

export default EmptyState;
