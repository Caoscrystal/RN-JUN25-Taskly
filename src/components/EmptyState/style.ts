import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoTask: {
    color: theme.text,
    ...Fonts.Roboto40016,
    marginBottom: 32,
  },
});

export default getStyles;

