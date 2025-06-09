import React from 'react';
import {View, Text, Modal} from 'react-native';
import Button from '../../../components/button';
import getStyles from './style';
import { useTheme } from '../../../Theme/ThemeContext';

type ModalProps = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmColor: string;
  onClose: () => void;
};

const ConfirmationModal = ({
  visible,
  title,
  description,
  confirmText,
  confirmColor,
  onClose,
}: ModalProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
            title={confirmText}
            fontFamily="Roboto50018"
            height={40}
            backgroundColor={confirmColor}
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;