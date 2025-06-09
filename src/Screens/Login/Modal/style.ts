import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';
import { ThemeType } from '../../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...Fonts.Roboto50018,
    color: theme.text,
    marginBottom: 10,

  },
  description: {
    ...Fonts.Roboto40016,
    color: theme.text,
    marginBottom: 20,
  },
});

export default getStyles;
