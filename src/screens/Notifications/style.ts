import { StyleSheet } from 'react-native';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
    area: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        display: 'flex',
    },
    areaText: {
        color: theme.text,
        fontSize: 20,
    },
});
export default  getStyles;
