import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../../../components/button';
import getStyles from './style';
import { useTheme } from '../../../Theme/ThemeContext';

interface LoginErrorModalProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const LoginErrorModal: React.FC<LoginErrorModalProps> = ({
  visible,
  title,
  description,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
          title="FECHAR"
          fontFamily="Roboto50018"
          backgroundColor={theme.background}
          textColor={theme.FilterButton}
          borderColor={theme.FilterButton}
          borderWidth={2}
          height={40}
          onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoginErrorModal;
