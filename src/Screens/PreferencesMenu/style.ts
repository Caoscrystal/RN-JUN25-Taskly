import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    textPreferences: {
        ...Fonts.Roboto40016,
    },
});

export default getStyles;
