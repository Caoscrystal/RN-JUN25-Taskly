import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
  avatarSource?: string | null;
}

const avatarMap: Record<string, any> = {
  avatar_1: require('../../Assets/Images/Avatars/avatar_1.png'),
  avatar_2: require('../../Assets/Images/Avatars/avatar_2.png'),
  avatar_3: require('../../Assets/Images/Avatars/avatar_3.png'),
  avatar_4: require('../../Assets/Images/Avatars/avatar_4.png'),
  avatar_5: require('../../Assets/Images/Avatars/avatar_5.png'),
};

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ leftComponent, avatarSource }) => {
  const avatarImage = avatarSource ? avatarMap[avatarSource] : avatarMap['avatar_1'];

  return (
    <View style={styles.header}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <Text style={styles.title}>TASKLY</Text>
      <Image source={avatarImage} style={styles.avatar} />
    </View>
  );
};


export default DefaultHeader;