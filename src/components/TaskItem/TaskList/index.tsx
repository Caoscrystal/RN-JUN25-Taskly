// src/compoenents/TaskItem/TaskList/index.tsx
import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import TaskItem from '../index';
import { styles } from './style';
import { Task } from '../../../interfaces/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void; // Recebe a função do Home
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  const renderItem: ListRenderItem<Task> = useCallback(({ item }) => {
    return (
      <TaskItem
        title={item.title}
        description={item.description ?? ''}
        categories={item.categories || []}
        isCompleted={item.isCompleted}
        onToggleComplete={() => onToggleComplete(item.id)} // Chama a função recebida
        task={item}
      />
    );
  }, [onToggleComplete]);

  const keyExtractor = useCallback((item: Task) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TaskList;