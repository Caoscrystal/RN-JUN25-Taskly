import { StyleSheet } from 'react-native';
import { ThemeType } from '../../Theme/theme';


const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: theme.text,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.Inputborder,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {

  },
  error: {
    marginTop: 4,
    color: '#E74C3C',
    fontSize: 12,
  },
});
export default getStyles;
