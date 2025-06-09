import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  title: {
    ...Fonts.Roboto70024,
    color: theme.text,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  leftContainer: {
    alignSelf: 'center',
  },
});

export default getStyles;
