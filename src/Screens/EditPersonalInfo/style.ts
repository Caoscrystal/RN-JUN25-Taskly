import {StyleSheet} from 'react-native';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputSpacing: {
    marginBottom: 50,
  },
  buttonSpacing: {
    marginTop: 30,
  },
});

export default getStyles;
