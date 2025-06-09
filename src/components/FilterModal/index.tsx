import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Button from '../button';
import Fonts from '../../Theme/fonts';
import Collapsible from 'react-native-collapsible';
import AnimatedCheck from '../AnimatedCheck';
import DateInput from '../DateInput';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onPrioritySelect: (priority: 'lowToHigh' | 'highToLow' | null) => void;
  onTagSelect: (tags: string[]) => void;
  onDateSelect: (date: Date | null) => void;
  availableTags: string[];
}


const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onPrioritySelect,
  onTagSelect,
  onDateSelect,
  availableTags,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<
    'lowToHigh' | 'highToLow' | null
  >(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  useEffect(() => {
    if (visible) {
      setIsSortOpen(false);
      setIsTagsOpen(false);
      setIsDateOpen(false);
    }
  }, [visible]);

  const toggleSort = () => {
    setIsSortOpen(prevState => !prevState);
  };

  const toggleTags = () => {
    setIsTagsOpen(prevState => !prevState);
  };

  const toggleDate = () => {
    setIsDateOpen(prevState => !prevState);
  };

  const handlePrioritySelect = (priority: 'lowToHigh' | 'highToLow') => {
    setSelectedPriority(prevPriority => (prevPriority === priority ? null : priority));
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
    } else {
      setSelectedTags(prevTags => [...prevTags, tag]);
    }
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setFilterDate(selectedDate);
  };

  const handleApplyFilter = () => {
    onPrioritySelect(selectedPriority);
    onTagSelect(selectedTags);
    onDateSelect(filterDate);
    onClose();
  };

  const handleClearFilter = () => {
    setSelectedPriority(null);
    setSelectedTags([]);
    setFilterDate(null);
    onPrioritySelect(null);
    onTagSelect([]);
    onDateSelect(null);
    onClose();
  };
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtro</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../Assets/icons/X.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.accordionArea}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={toggleSort}>
              <Text style={styles.accordionTitle}>Ordenar por</Text>
              <Image
                source={
                  isSortOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              />
            </TouchableOpacity>
            <Collapsible collapsed={!isSortOpen}>
              <View>
                <View style={[styles.itemAccordion, styles.lineDown]}>
                  <TouchableOpacity
                    style={styles.selectionAreaItemAccordion}
                    onPress={() => handlePrioritySelect('lowToHigh')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'lowToHigh'}
                      onToggle={() => handlePrioritySelect('lowToHigh')}
                      checkedImageSource={require('../../Assets/icons/checked-input.png')}
                      uncheckedImageSource={require('../../Assets/icons/uncheck-input.png')}
                    />
                    <Text style={styles.optionText}>
                      Prioridade (de baixa para alta)
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemAccordion}>
                  <TouchableOpacity
                    style={styles.selectionAreaItemAccordion}
                    onPress={() => handlePrioritySelect('highToLow')}>
                    <AnimatedCheck
                      isCompleted={selectedPriority === 'highToLow'}
                      onToggle={() => handlePrioritySelect('highToLow')}
                      checkedImageSource={require('../../Assets/icons/checked-input.png')}
                      uncheckedImageSource={require('../../Assets/icons/uncheck-input.png')}
                    />
                    <Text style={styles.optionText}>
                      Prioridade (de alta para baixa)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Collapsible>

            <TouchableOpacity
              style={[styles.accordionHeader, styles.lineTop]}
              onPress={toggleTags}>
              <Text style={styles.accordionTitle}>Tags</Text>
              <Image
                source={
                  isTagsOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              />
            </TouchableOpacity>
            <Collapsible collapsed={!isTagsOpen}>
              <ScrollView style={styles.tagsScrollView}>
                <View style={styles.tagsContainer}>
                  {availableTags.map(tag => (
                    <View
                      key={tag}
                      style={[styles.itemAccordion, styles.tagItem, styles.lineDown]}>
                      <TouchableOpacity style={styles.selectionAreaItemAccordion} onPress={() => handleTagSelect(tag)}>
                        <AnimatedCheck
                          isCompleted={selectedTags.includes(tag)}
                          onToggle={() => handleTagSelect(tag)}
                          checkedImageSource={require('../../Assets/icons/CheckSquare-2.png')}
                          uncheckedImageSource={require('../../Assets/icons/CheckSquare-1.png')}
                        />
                        <Text style={[styles.optionText, styles.tag]}>{tag}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Collapsible>

            <TouchableOpacity
              style={[styles.accordionHeader, styles.lineTop]}
              onPress={toggleDate}>
              <Text style={styles.accordionTitle}>Data</Text>
              <Image
                source={
                  isDateOpen
                    ? require('../../Assets/icons/arrowUp.png')
                    : require('../../Assets/icons/arrowDown.png')
                }
              />
            </TouchableOpacity>
            <Collapsible collapsed={!isDateOpen}>
              <View style={styles.dateFilterContainer}>
                <DateInput
                  initialDate={filterDate}
                  onDateChange={handleDateChange}
                />
              </View>
            </Collapsible>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title="APLICAR"
              backgroundColor={styles.Button.backgroundColor}
              textColor={styles.Button.color}
              fontFamily={Fonts.Roboto50018.fontFamily}
              fontWeight={500}
              fontSize={Fonts.Roboto50018.fontSize}
              width="100%"
              height={37}
              onPress={handleApplyFilter}
            />
            <Button
              title="LIMPAR FILTRO"
              backgroundColor={styles.Button.backgroundColor}
              textColor={styles.Button.color}
              fontFamily={Fonts.Roboto50018.fontFamily}
              fontWeight={500}
              fontSize={Fonts.Roboto50018.fontSize}
              width="100%"
              height={37}
              onPress={handleClearFilter}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
