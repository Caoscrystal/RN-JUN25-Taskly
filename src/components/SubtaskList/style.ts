import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  subtaskArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 32,
  },
  subtaskAreaText: {
    flexDirection: 'row',
    gap: 7,
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 10,
  },
  subtaskText: {
    ...Fonts.Roboto40016,
    color: theme.text,
    flexShrink: 1,
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  confirmEditButton:{
      position: 'absolute',
      right: 10,
      top: 13,
  },
  inputEditArea: {
    width: '100%',
  },

});
export default getStyles;

