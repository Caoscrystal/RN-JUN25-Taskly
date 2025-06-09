import { View, Text } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';

export default function Notifications() {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.area}>
            <Text style={styles.areaText}>Ainda Em construção!</Text>

        </View>
    );
}
