import { TouchableOpacity, Text, ImageSourcePropType, Image } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

type Props = {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void
  };

  export function CarouselActionItem({ title, icon, onPress }: Props) {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return (
      <TouchableOpacity style={styles.container} onPress={onPress} >
        <Text style={styles.title}>{title}</Text>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    );
 }
