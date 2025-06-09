import {StyleSheet} from 'react-native';
import { ThemeType } from '../../Theme/theme';
import Fonts from '../../Theme/fonts';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: theme.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 127,
  },
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
  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  taskListContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
});

export default getStyles;
