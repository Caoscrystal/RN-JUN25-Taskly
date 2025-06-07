import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import getStyles from './style'; // Importe a função getStyles
import Button from '../../../components/button';
import { useTheme } from '../../../Theme/ThemeContext';

interface ThemeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ThemeModal({ visible, onClose }: ThemeModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | null>(null);

  const { toggleTheme, isDarkMode, theme } = useTheme(); // Obtenha o theme também
  const styles = getStyles(theme); // Chama a função getStyles com o tema

  const handleConfirm = () => {
    if (selectedTheme === 'dark' && !isDarkMode) {
      toggleTheme(); // Troca para modo escuro
    } else if (selectedTheme === 'light' && isDarkMode) {
      toggleTheme(); // Troca para modo claro
    }
    onClose(); // Fecha o modal
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Escolha o tema</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.card,
                selectedTheme === 'dark' && styles.selectedCard,
            ]}
                onPress={() => setSelectedTheme('dark')}
                activeOpacity={0.8}
            >
              <Image
                source={require('../../../Assets/icons/dark-icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,
                selectedTheme === 'light' && styles.selectedCard,
            ]}
                onPress={() => setSelectedTheme('light')}
                activeOpacity={0.8}
            >
              <Image
                source={require('../../../Assets/icons/light-icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>

            <Button
           title="Agora não"
              fontFamily="Roboto50018"
              width={140}
              height={40}
              backgroundColor={theme.background} // Use o theme para o fundo
              textColor={theme.FilterButton} // Use o theme para a cor do texto
              borderColor={theme.FilterButton} // Use o theme para a borda
              borderWidth={2}
              onPress={onClose}
            />

            <Button
              title="Confirmar"
              fontFamily="Roboto50018"
              width={140}
              height={40}
              backgroundColor="#32C25B" // Use o theme para o fundo
              onPress={handleConfirm}
              textColor={theme.background} // Use o theme para a cor
            />

          </View>
        </View>
      </View>
    </Modal>
  );
}
