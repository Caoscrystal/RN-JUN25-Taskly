import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../interfaces/task'; // ajuste o caminho se necessário

const getTasksKey = (userId: string) => `tasks_${userId}`;

export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(getTasksKey(userId));
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
};

export const saveTasks = async (userId: string, tasks: Task[]): Promise<void> => {
  try {
    console.log('Tentando salvar tarefas para userId:', userId);
    console.log('Tasks:', tasks);
    if (!userId || typeof userId !== 'string') {
      throw new Error('userId inválido: ' + String(userId));
    }
    if (!Array.isArray(tasks)) {
      throw new Error('tasks não é um array: ' + JSON.stringify(tasks));
    }
    await AsyncStorage.setItem(getTasksKey(userId), JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
    throw error;
  }
};

export const updateTask = async (
  userId: string,
  taskId: string,
  updateFn: (task: Task) => Task
): Promise<void> => {
  try {
    const storedTasks = await AsyncStorage.getItem(getTasksKey(userId));
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updated = updateFn(task);
        if (!updated) {throw new Error('updateFn retornou undefined');}
        return updated;
      }
      return task;
    });

    await AsyncStorage.setItem(getTasksKey(userId), JSON.stringify(updatedTasks));
  } catch (error) {
    console.error(`Erro ao atualizar tarefa ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  try {
    const tasks = await getTasks(userId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(userId, updatedTasks);
  } catch (error) {
    console.error(`Erro ao deletar tarefa ${taskId}:`, error);
    throw error;
  }
};
