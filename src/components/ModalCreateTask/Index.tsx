 import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Input from '../input';
import DateInput from '../DateInput';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description: string;
    deadline: string | null | undefined;
  }) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    deadline?: string;
  }>({});

  const resetModalInputs = () => {
    setTitle('');
    setDescription('');
    setDeadlineDate(null);
    setErrors({});
  };

  useEffect(() => {
    if (!visible) {
      resetModalInputs();
    }
  }, [visible]);

  const validateTitle = (text: string) => {
    if (!text.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, title: 'Título é obrigatório' }));
    } else if (errors.title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: undefined }));
    }
    setTitle(text);
  };

  const validateDescription = (text: string) => {
    if (!text.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, description: 'Descrição é obrigatória' }));
    } else if (errors.description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
    }
    setDescription(text);
  };

  const handleDeadlineChange = (selectedDate: Date | null) => {
    setDeadlineDate(selectedDate);
    if (selectedDate && errors.deadline) {
      setErrors((prevErrors) => ({ ...prevErrors, deadline: undefined }));
    } else if (!selectedDate) {
      setErrors((prevErrors) => ({ ...prevErrors, deadline: 'Prazo é obrigatório' }));
    }
  };

  const handleCreate = () => {
    const isTitleValid = !errors.title && title.trim();
    const isDescriptionValid = !errors.description && description.trim();
    const isDeadlineValid = deadlineDate !== null;

    if (isTitleValid && isDescriptionValid && isDeadlineValid) {
      onCreate({ title, description, deadline: deadlineDate?.toISOString() });
      resetModalInputs();
    } else {
      if (!title.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, title: 'Título é obrigatório' }));
      }
      if (!description.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, description: 'Descrição é obrigatória' }));
      }
      if (!deadlineDate) {
        setErrors((prevErrors) => ({ ...prevErrors, deadline: 'Prazo é obrigatório' }));
      }
    }
  };

  const formattedDate = deadlineDate ? format(deadlineDate, 'dd/MM/yyyy', { locale: ptBR }) : '';
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar tarefa</Text>

            <View style={styles.inputContainer}>
              <Input
                label="Título"
                error={errors.title}
                width={281}
                placeholder="Ex: bater o ponto"
                value={title}
                onChangeText={validateTitle}
              />

              <View style={styles.textinputArea}>
                <Input
                  label="Descrição"
                  error={errors.description}
                  width={281}
                  multiline={true}
                  height={81}
                  value={description}
                  onChangeText={validateDescription}
                  textAlignVertical="top"
                />
              </View>

              <DateInput
                label="Prazo"
                onDateChange={handleDeadlineChange}
                error={errors.deadline}
                initialDate={deadlineDate}
                value={formattedDate}
                editable={false}
                placeholder={formattedDate || 'DD/MM/YYYY'}
              />

            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreate}>
                <Text style={styles.createText}>CRIAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;