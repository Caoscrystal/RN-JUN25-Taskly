import { TouchableOpacity, Text, Image } from "react-native";
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

export default function ({ onPress }: { onPress?: () => void }) {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.text}>Habilitar tema claro</Text>
            <Image source={require('../../Assets/icons/VectorBack.png')} style={styles.icon}/>
        </TouchableOpacity>
    )
}