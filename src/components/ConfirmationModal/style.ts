import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  modalContent: {
    backgroundColor: theme.background,
    borderRadius: 16,
    padding: 24,

    alignItems: 'center',
  },
  title: {
    ...Fonts.Roboto50018,
    color: theme.text,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  description: {
    ...Fonts.Roboto40016,
    marginBottom: 18,
    color: theme.text,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cor: {
    color: theme.cancelButton,
    backgroundColor: theme.background,
  },
});

export default getStyles;
