import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';


const getStyles = (theme: ThemeType) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    ...Fonts.Roboto50018,
    textAlign: 'left',
    color: theme.text,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: theme.background,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5B3CC4',
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  cancelText: {
    color: '#5B3CC4',
    ...Fonts.Roboto50018,
    textTransform: 'uppercase',
  },
  createButton: {
    backgroundColor: theme.FilterButton,
    borderRadius: 8,
    width: 134.5,
    height: 37,
    alignItems: 'center',
    justifyContent:'center',
  },
  createText: {
    color: theme.background,
    ...Fonts.Roboto50018,
    textTransform: 'uppercase',
  },
  inputContainer: {
    gap: 24,
    marginBottom: 12,
    marginTop: 12,
    width: '100%',
  },
  textinputArea:{
    marginBottom: 35,
  },
});

export default getStyles;
