import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './style';

interface FilterProps {
  onPress: () => void;
}

export default function Filter({ onPress }: FilterProps) {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.filterIcon}
          source={require('../../Assets/icons/FilterIcon.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
