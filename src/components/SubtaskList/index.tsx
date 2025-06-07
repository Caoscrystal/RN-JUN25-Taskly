import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AnimatedCheck from '../AnimatedCheck';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import Input from '../input';
import { ImageSourcePropType } from 'react-native';

interface Subtask {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface SubtaskListProps {
  subtasks: Subtask[];
  onToggleSubtask: (id: string) => void;
  checkedImage: ImageSourcePropType;
  uncheckedImage: ImageSourcePropType;
  onEditSubtask: (id: string, newText: string) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  onToggleSubtask,
  checkedImage,
  uncheckedImage,
  onEditSubtask,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEditPress = useCallback((id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  }, []);

  const handleConfirmEdit = useCallback((id: string) => {
    if (editText.trim()) {
      onEditSubtask(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  }, [editText, onEditSubtask]);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View>
      {subtasks.map((item) => (
        <View key={item.id} style={styles.subtaskItem}>
          {editingId === item.id ? (
            <View style={styles.inputEditArea}>
              <Input value={editText} onChangeText={setEditText} />
              <TouchableOpacity style={styles.confirmEditButton} onPress={() => handleConfirmEdit(item.id)}>
                <Image source={require('../../Assets/icons/arrowConfirm.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.subtaskArea}>
              <View style={styles.subtaskAreaText}>
                <AnimatedCheck
                  isCompleted={item.isCompleted}
                  onToggle={() => onToggleSubtask(item.id)}
                  checkedImageSource={checkedImage}
                  uncheckedImageSource={uncheckedImage}
                />
                <Text style={[styles.subtaskText, item.isCompleted && styles.subtaskTextCompleted]}>
                  {item.text}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleEditPress(item.id, item.text)}>
                <Image source={require('../../Assets/icons/Pencil.png')} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default SubtaskList;
