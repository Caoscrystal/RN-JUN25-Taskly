import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Fonts from '../../Theme/fonts';
import { useTheme } from '../../Theme/ThemeContext';
import { ThemeType } from '../../Theme/theme';


interface BackButtonProps {
  onPress: () => void;
  rightText?: string; // Texto opcional ao lado do botão
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, rightText }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  
  return (
    <View style={styles.container}>
      {/* Botão VOLTAR */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Text style={styles.textButton}> {'<'} VOLTAR</Text>
        </View>
      </TouchableOpacity>

      {/* Texto ao lado do botão, exemplo: 'Termos e regulamentos' */}
      {rightText && <Text style={styles.textRight}>{rightText}</Text>}
    </View>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    width: 329,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.backButton,
    width: 113,
    height: 48,
    borderRadius: 12,
    padding: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  textButton: {
    color: theme.background,
    ...Fonts.Roboto50018,
  },
  textRight: {
    color: theme.text,
    ...Fonts.Roboto40016,
  },
});

export default BackButton;
