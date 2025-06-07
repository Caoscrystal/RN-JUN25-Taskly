import React, { useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import getStyles from './style';
import AnimatedCheck from '../AnimatedCheck';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import { Task } from '../../interfaces/task';
import CategoryTag from '../CategoryTag';
import Fonts from '../../Theme/fonts';
import CheckedIcon from '../../Assets/icons/checked-input.png';
import UncheckedIcon from '../../Assets/icons/uncheck-input.png';

interface TaskItemProps {
  title: string;
  description: string;
  categories: string[];
  isCompleted: boolean;
  onToggleComplete: () => void;
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, categories, isCompleted, onToggleComplete, task }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const buttonScaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
    (animatedValue: Animated.Value, toValue: number, duration: number, callback?: () => void) => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    []
  );

  const handleButtonPress = () => {
    animateScale(buttonScaleValue, 0.9, 50, () => {
      animateScale(buttonScaleValue, 1, 100, () => {
        navigation.navigate('TaskDetails', { task });
      });
    });
  };

  const animatedButtonStyle = {
    transform: [{ scale: buttonScaleValue }],
  };

  const renderCategoryItem = useCallback(({ item }: { item: string }) => (
    <CategoryTag item={item} fontStyle={{...Fonts.Roboto40012}}/>
  ), []);

  const keyExtractorCategory = useCallback((item: string, index: number) => index.toString(), []);

  console.log('TaskItem rendered:', title, isCompleted);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.itemArea}>
      <View style={styles.headerTask}>
        <Text style={styles.title}>{title}</Text>
        <AnimatedCheck
          isCompleted={isCompleted}
          onToggle={() => {
            console.log('onToggleComplete called'); // Debug
            onToggleComplete();
          }}
          checkedImageSource={CheckedIcon}
          uncheckedImageSource={UncheckedIcon}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={keyExtractorCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={[styles.button, animatedButtonStyle]} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>VER DETALHES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;
