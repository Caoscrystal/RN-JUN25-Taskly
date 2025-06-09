import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import Button from '../../components/button';
import CreateTaskModal from '../../components/ModalCreateTask/Index';
import EmptyState from '../../components/EmptyState';
import TaskItem from '../../components/TaskItem';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import Fonts from '../../Theme/fonts';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, BottomTabParamList} from '../../Navigation/types';
import {getTasks, saveTasks} from '../../Utils/asyncStorageUtils';
import {Task} from '../../interfaces/task';
import DefaultHeader from '../../components/DefaultHeader';
import {API_BASE_URL} from '../../env';
import * as Keychain from 'react-native-keychain';

type PriorityType = 'lowToHigh' | 'highToLow' | null;
type TagsType = string[];
type DateType = Date | null;

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeRouteProp>();
  const flatListRef = useRef<FlatList<Task>>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(null);
  const [selectedTags, setSelectedTags] = useState<TagsType>([]);
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tasksLoaded, setTasksLoaded] = useState(false);

 useEffect(() => {
    const loadAvatarAndUserId = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (!credentials || !credentials.password) {
          throw new Error('Token não encontrado.');
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${credentials.password}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setAvatar(userData.picture);
          setUserId(userData.email); // Use sempre o mesmo campo!
          console.log('userId carregado:', userData.email);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar o avatar do usuário.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao carregar o avatar.');
      }
    };

    loadAvatarAndUserId();
  }, []);


  useEffect(() => {
  if (!userId) return;
  console.log('Carregando tarefas para userId:', userId);
  const loadTasks = async () => {
    try {
      const storedTasks = await getTasks(userId);
      setTasks(storedTasks ?? []);
      setTasksLoaded(true); // <-- Só depois de carregar
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  };
  loadTasks();
}, [userId]);


  useEffect(() => {
  if (!userId || !tasksLoaded) return; // <-- Só salva depois de carregar
  console.log('Salvando tarefas para userId:', userId);
  const saveTasksToStorage = async () => {
    try {
      await saveTasks(userId, tasks);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as tarefas.');
    }
  };
  saveTasksToStorage();
}, [tasks, userId, tasksLoaded]);

  useEffect(() => {
    const uniqueTags = new Set<string>();
    tasks.forEach(task => {
      (task.categories ?? []).forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(Array.from(uniqueTags));
  }, [tasks]);

  useEffect(() => {
    const scrollToTaskId = route.params?.scrollToTaskId;
    if (scrollToTaskId && filteredTasks.length > 0) {
      const index = filteredTasks.findIndex(task => task.id === scrollToTaskId);
      if (index !== -1 && flatListRef.current) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({index, animated: true});
        }, 500);
      }
    }
  }, [route.params?.scrollToTaskId, filteredTasks]);

  const handleCreateTask = useCallback(
    async (taskData: {
      title: string;
      description: string;
      deadline: string | null | undefined;
    }) => {
      const newTask: Task = {
        ...taskData,
        id: String(Date.now()),
        categories: [],
        isCompleted: false,
        priority: 0,
        subtasks: [],
        createdAt: Date.now(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setIsModalVisible(false);
    },
    [],
  );

  const handleOpenCreateTaskModal = () => setIsModalVisible(true);
  const handleCloseCreateTaskModal = () => setIsModalVisible(false);
  const handleOpenFilterModal = () => setIsFilterModalVisible(true);
  const handleCloseFilterModal = () => setIsFilterModalVisible(false);

  const handlePrioritySelect = (priority: PriorityType) =>
    setSelectedPriority(priority);
  const handleTagSelect = (tags: TagsType) => setSelectedTags(tags);
  const handleDateSelect = (date: DateType) => setSelectedDate(date);

  const handleTaskDetailsNavigation = (taskItem: Task) => {
    navigation.navigate('TaskDetails', {task: taskItem});
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task,
      ),
    );
  };

  const renderTaskItem = ({item}: {item: Task}) => (
    <TouchableOpacity onPress={() => handleTaskDetailsNavigation(item)}>
      <TaskItem
        title={item.title}
        description={item.description ?? ''}
        categories={item.categories ?? []}
        isCompleted={item.isCompleted}
        task={item}
        onToggleComplete={() => handleToggleTaskComplete(item.id)}
      />
    </TouchableOpacity>
  );

  const keyExtractorTask = (item: Task) => item.id;

  useEffect(() => {
    let tempTasks = [...tasks];

    // Filtra por tags selecionadas
    if (selectedTags.length > 0) {
      tempTasks = tempTasks.filter(task =>
        selectedTags.every(tag => (task.categories ?? []).includes(tag)),
      );
    }

    // Filtra por data selecionada
    if (selectedDate) {
      const filterDateString = selectedDate.toISOString().split('T')[0];

      tempTasks = tempTasks.filter(task => {
        if (!task.deadline) return false;

        const taskDate = new Date(task.deadline);
        if (isNaN(taskDate.getTime())) return false;

        const taskDateString = taskDate.toISOString().split('T')[0];
        return taskDateString === filterDateString;
      });
    }

    // Ordena por prioridade
    if (selectedPriority) {
      tempTasks.sort((a, b) => {
        const priorityA = a.priority ?? -1;
        const priorityB = b.priority ?? -1;

        return selectedPriority === 'lowToHigh'
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    setFilteredTasks(tempTasks);
  }, [tasks, selectedTags, selectedDate, selectedPriority]);

  useFocusEffect(
  useCallback(() => {
    if (!userId) return; // <-- Adicione esta linha!
    const loadUpdatedTasks = async () => {
      try {
        const storedTasks = await getTasks(userId);
        if (storedTasks) {
          setTasks(storedTasks);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível recarregar as tarefas.');
      }
    };
    loadUpdatedTasks();
  }, [userId]),
);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <DefaultHeader avatarSource={avatar || undefined} />

      {tasks.length === 0 ? (
        <View style={styles.containerNoTask}>
          <EmptyState />
        </View>
      ) : (
        <View style={styles.taskListContainer}>
          <Filter onPress={handleOpenFilterModal} />
          <FlatList
            ref={flatListRef}
            data={filteredTasks}
            renderItem={renderTaskItem}
            keyExtractor={keyExtractorTask}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <Button
        title="CRIAR TAREFA"
        fontFamily={Fonts.Roboto60020.fontFamily}
        fontWeight={600}
        fontSize={Fonts.Roboto60020.fontSize}
        backgroundColor={theme.FilterButton}
        textColor={theme.background}
        onPress={handleOpenCreateTaskModal}
        width={329}
      />

      <CreateTaskModal
        visible={isModalVisible}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilterModal}
        onPrioritySelect={handlePrioritySelect}
        onTagSelect={handleTagSelect}
        onDateSelect={handleDateSelect}
        availableTags={allTags}
      />
    </View>
  );
};

export default Home;
