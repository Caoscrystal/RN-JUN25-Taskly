import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 13,
        backgroundColor: theme.backButton,
        height: 50,
        width: 110,
        borderRadius: 10,
      },
      backText: {
        color: theme.text,
        ...Fonts.Roboto50018,
      },
      editText: {
        ...Fonts.Roboto40016,
      },
});

export default getStyles;
