import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

type ProfileHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function ProfileHeader({ title, onBackPress }: ProfileHeaderProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}>
        <Image source={require('../../Assets/icons/VectorBack.png')} />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.editText}>{title}</Text>
    </View>
  );
}