import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import DefaultHeader from '../../components/DefaultHeader';
import CategoryTag from '../../components/CategoryTag';
import SmallBackButton from '../../components/SmallBackButton';
import Input from '../../components/input';
import SubtaskList from '../../components/SubtaskList';
import DateInput from '../../components/DateInput';
import { Task, Subtask } from '../../interfaces/task';
import { updateTask } from '../../Utils/asyncStorageUtils';
import ArrowConfirmIcon from '../../Assets/icons/arrowConfirm.png';
import CheckedIcon from '../../Assets/icons/CheckSquare-2.png';
import UncheckedIcon from '../../Assets/icons/CheckSquare-1.png';
import GoldPencilIcon from '../../Assets/icons/GoldPencil.png';
import XCircle from '../../Assets/icons/XCircle.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isValid } from 'date-fns';
import { API_BASE_URL } from '../../env';
import * as keychain from 'react-native-keychain'

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
    onTaskUpdated?: (updatedTask: Task) => void;
}

type PriorityLevel = 'ALTA' | 'MÉDIA' | 'BAIXA' | 'Sem prioridade';

const mapPriorityToString = (priority?: number): PriorityLevel => {
    switch (priority) {
        case 2:
            return 'ALTA';
        case 1:
            return 'MÉDIA';
        case 0:
            return 'BAIXA';
        default:
            return 'Sem prioridade';
    }
};

const TaskDetailsScreen: React.FC<TaskDetailsProps> = ({ onTaskUpdated }) => {
    const route = useRoute<TaskDetailsRouteProp>();
    const { task: initialTask } = route.params;
    const [task, setTask] = useState<Task>(initialTask);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [newTag, setNewTag] = useState('');
    const [subtasks, setSubtasks] = useState<Subtask[]>(initialTask.subtasks || []);
    const [newSubtaskText, setNewSubtaskText] = useState('');
    const [showInput, setShowInput] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(initialTask.title);
    const [editedDescription, setEditedDescription] = useState(initialTask.description);
    const [editedCategories, setEditedCategories] = useState<string[]>(initialTask.categories || []);
    const [editedPriority, setEditedPriority] = useState<number | undefined>(initialTask.priority);
    const [editedDeadline, setEditedDeadline] = useState<Date | null>(null);
    const [tagError, setTagError] = useState('');
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TaskDetails'>>();

    useEffect(() => {
        if (initialTask?.deadline) {
            const parsedDate = new Date(initialTask.deadline);
            if (isValid(parsedDate)) {
                setEditedDeadline(parsedDate);
            } else {
                setEditedDeadline(null);
                console.error('Data de prazo inicial inválida:', initialTask.deadline);
            }
        } else {
            setEditedDeadline(null);
        }
        setTask(initialTask);
        setSubtasks(initialTask.subtasks || []);
    }, [initialTask]);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                console.log('Tentando buscar perfil do usuário...');
                const credentials = await keychain.getGenericPassword();
                if (!credentials || !credentials.password) {
                    throw new Error('Token não encontrado.');
                }

                const token = credentials.password;

                const response = await fetch(`${API_BASE_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log('Dados do perfil:', userData);
                    setAvatar(userData.picture); // Atualiza o avatar com o valor retornado pela API
                } else {
                    console.error('Erro ao buscar perfil do usuário:', response.status);
                    Alert.alert('Erro', 'Não foi possível carregar o avatar do usuário.');
                }
            } catch (error) {
                console.error('Erro ao carregar avatar:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao carregar o avatar.');
            }
        };

        loadAvatar();
    }, []);

    useEffect(() => {
        console.log('Valor de editedDeadline:', editedDeadline);
    }, [editedDeadline]);

    const handleResolveTask = async (): Promise<void> => {
        const updatedTask = { ...task, isCompleted: true };
        setTask(updatedTask);
        await handleUpdateTask(updatedTask);

        navigation.navigate('MainApp', {
            screen: 'Home',
            params: { scrollToTaskId: updatedTask.id },
        });
    };

    const handleReopenTask = async (): Promise<void> => {
        const updatedTask = { ...task, isCompleted: false };
        setTask(updatedTask);
        await handleUpdateTask(updatedTask);

        navigation.navigate('MainApp', {
            screen: 'Home',
            params: { scrollToTaskId: updatedTask.id },
        });
    };

    const handleShowAddSubtaskInput = (): void => {
        setShowInput(true);
        setNewSubtaskText('');
    };

    const handleUpdateTask = useCallback(
        async (updatedTask: Task): Promise<void> => {
            try {
                await updateTask(updatedTask.id, () => updatedTask);
                if (onTaskUpdated) {
                    onTaskUpdated(updatedTask);
                }
            } catch (error: any) {
                console.error('Erro ao atualizar a tarefa:', error);
            }
        },
        [onTaskUpdated]
    );

    const handleAddSubtask = useCallback((): void => {
        const text = newSubtaskText.trim();
        if (text) {
            const newSubtask: Subtask = {
                id: String(Date.now()),
                text: text,
                isCompleted: false,
            };
            const updatedSubtasks = [...subtasks, newSubtask];
            setSubtasks(updatedSubtasks);

            const updatedTask = { ...task, subtasks: updatedSubtasks };
            handleUpdateTask(updatedTask);
            setNewSubtaskText('');
            setShowInput(false);
        }
    }, [newSubtaskText, subtasks, task, handleUpdateTask]);

    const handleToggleSubtask = useCallback((id: string): void => {
        const updatedSubtasks = subtasks.map((subtask) =>
            subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
        );
        setSubtasks(updatedSubtasks);

        const updatedTask = { ...task, subtasks: updatedSubtasks };
        handleUpdateTask(updatedTask);
    }, [subtasks, task, handleUpdateTask]);

    const handleEditSubtask = useCallback((id: string, newText: string): void => {
        const updatedSubtasks = subtasks.map((subtask) =>
            subtask.id === id ? { ...subtask, text: newText } : subtask
        );
        setSubtasks(updatedSubtasks);

        const updatedTask = { ...task, subtasks: updatedSubtasks };
        handleUpdateTask(updatedTask);
    }, [subtasks, task, handleUpdateTask]);

    const priorityText = mapPriorityToString(task.priority);

    const handleEditTask = (): void => {
        setIsEditing(true);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedCategories(task.categories || []);
        setEditedPriority(task.priority);
        setEditedDeadline(initialTask.deadline ? new Date(initialTask.deadline) : null);
    };

    const handleCancelEdit = (): void => {
        setIsEditing(false);
    };

    const handleConfirmEdit = async (): Promise<void> => {
        const deadlineToSave =
            editedDeadline instanceof Date && isValid(editedDeadline) ? editedDeadline.toISOString() : null;

        const updatedTask: Task = {
            ...task,
            title: editedTitle,
            description: editedDescription,
            categories: editedCategories,
            priority: editedPriority,
            deadline: deadlineToSave,
        };

        setTask(updatedTask);
        await handleUpdateTask(updatedTask);
        setIsEditing(false);
    };

    const handleAddTag = (tag: string) => {
        const trimmedTag = tag.trim();

        if (!trimmedTag) {
            setTagError('');
            return;
        }

        if (trimmedTag.includes(' ')) {
            setTagError('Por favor, insira apenas uma palavra por tag.');
            return;
        }

        if (editedCategories.includes(trimmedTag)) {
            setTagError('Tag já adicionada.');
            return;
        }

        const updatedTags = [...editedCategories, trimmedTag];
        setEditedCategories(updatedTags);
        setNewTag('');
        setTagError(''); // limpa erro ao adicionar com sucesso
    };

    const handleRemoveTag = (tagToRemove: string): void => {
        setEditedCategories(editedCategories.filter((tag) => tag !== tagToRemove));
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView
                ref={scrollViewRef}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollViewContent}
            >
                <DefaultHeader leftComponent={<SmallBackButton />} avatarSource={avatar} />
                <View style={styles.taskDetailsContainer}>
                    {!isEditing ? (
                        <>
                            <View>
                                <TouchableOpacity style={styles.editButton} onPress={handleEditTask}>
                                    <Image source={GoldPencilIcon} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.title}>Título</Text>
                                <Text style={styles.titleTag}>{task.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Descrição</Text>
                                <Text style={styles.description}>{task.description}</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title}>Tags</Text>
                                    <View style={styles.carousel}>
                                        {task.categories && task.categories.length > 0 ? (
                                            task.categories.map((tag, index) => (
                                                <CategoryTag key={index} item={tag} />
                                            ))
                                        ) : (
                                            <Text style={styles.notag}>No tags available</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Prioridade</Text>
                                <Text style={styles.priority}>{priorityText}</Text>
                            </View>
                            <TouchableOpacity
                                style={task.isCompleted ? styles.reopenButton : styles.resolveButton}
                                onPress={task.isCompleted ? handleReopenTask : handleResolveTask}
                            >
                                <Text style={task.isCompleted ? styles.reopenButtonText : styles.resolveButtonText}>
                                    {task.isCompleted ? 'Reabrir Tarefa' : 'Resolver Tarefa'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.containerEdit}>
                            <View>
                                <Text style={styles.title}>Título</Text>
                                <Input
                                    value={editedTitle}
                                    onChangeText={setEditedTitle}
                                    containerStyle={styles.zeroedBottomInput}
                                />
                            </View>
                            <View>
                                <Text style={styles.title}>Descrição</Text>
                                <Input
                                    value={editedDescription}
                                    multiline={true}
                                    height={81}
                                    textAlignVertical="top"
                                    onChangeText={setEditedDescription}
                                    containerStyle={styles.descriptionInput}
                                />
                            </View>

                            <View>
                                <View>
                                    <Text style={styles.title}>Tags</Text>
                                    <View>
                                        <Input
                                            placeholder="Adicionar tag"
                                            value={newTag}
                                            onChangeText={(text) => {
                                                setNewTag(text);
                                                setTagError('');
                                            }}
                                            onSubmitEditing={(event) => {
                                                handleAddTag(event.nativeEvent.text);
                                            }}
                                            containerStyle={tagError ? styles.tagsInputError : styles.tagsInput}
                                            error={tagError}
                                        />

                                        <TouchableOpacity
                                            style={styles.confirmButtonCircle}
                                            onPress={() => handleAddTag(newTag)}
                                        >
                                            <Image source={ArrowConfirmIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.carousel}>
                                    {editedCategories.map((item, index) => (
                                        <View key={index.toString()} style={styles.tagItem}>
                                            <Text style={styles.tagText}>{item}</Text>
                                            <TouchableOpacity onPress={() => handleRemoveTag(item)}>
                                                <Image source={XCircle} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View>
                                <Text style={styles.title}>Prioridade</Text>
                                <View style={styles.priorityContainer}>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, editedPriority === 2 && styles.priorityButtonActive]}
                                        onPress={() => setEditedPriority(2)}
                                    >
                                        <Text style={[styles.priorityText, editedPriority === 2 && styles.priorityTextActive]}>Alta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, editedPriority === 1 && styles.priorityButtonActive]}
                                        onPress={() => setEditedPriority(1)}
                                    >
                                        <Text style={[styles.priorityText, editedPriority === 1 && styles.priorityTextActive]}>Média</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, editedPriority === 0 && styles.priorityButtonActive]}
                                        onPress={() => setEditedPriority(0)}
                                    >
                                        <Text style={[styles.priorityText, editedPriority === 0 && styles.priorityTextActive]}>Baixa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.title}>Prazo</Text>
                                <DateInput
                                    initialDate={editedDeadline || new Date()}
                                    onDateChange={setEditedDeadline}
                                    containerStyle={styles.zeroedBottomInput}
                                />
                            </View>
                        </View>
                    )}
                </View>
                {!isEditing ? (
                    <>
                        <SubtaskList
                            subtasks={subtasks}
                            onToggleSubtask={handleToggleSubtask}
                            checkedImage={CheckedIcon}
                            uncheckedImage={UncheckedIcon}
                            onEditSubtask={handleEditSubtask}
                        />

                        {showInput && (
                            <View style={styles.addSubtaskInputContainer}>
                                <Input
                                    placeholder="Escreva sua subtarefa..."
                                    value={newSubtaskText}
                                    onChangeText={setNewSubtaskText}
                                    onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                />
                                <TouchableOpacity style={styles.confirmButtonCircle} onPress={handleAddSubtask}>
                                    <Image source={ArrowConfirmIcon} />
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity style={styles.addButton} onPress={handleShowAddSubtaskInput}>
                            <Text style={styles.addButtonText}>ADICIONAR SUBTASK</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.editButtonsContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmEdit}>
                            <Text style={styles.confirmButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.bottomSpace} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default TaskDetailsScreen;
