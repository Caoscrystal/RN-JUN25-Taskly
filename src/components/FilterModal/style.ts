import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';


const getStyles = (theme: ThemeType) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalContent: {
    backgroundColor: theme.background,
    padding: 24,
    borderRadius: 8,
    minHeight: 382,
    width: 329,
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...Fonts.Roboto70024,
    color: theme.text,
  },
  modalHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13.5,
  },
  buttonsContainer: {
    gap: 12,
  },
  accordionTitle: {
    ...Fonts.Roboto50018,
    color: theme.text,
  },
  accordionArea: {
    marginBottom: 32,
  },
  lineTop: {
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  lineDown: {
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  itemAccordion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14.5,
    paddingHorizontal: 8,
    backgroundColor: '#E6E0F7',
  },
  optionText: {
    ...Fonts.Roboto40016,
    color: '#1E1E1E',
    marginLeft: 8,
  },
  tag:{
    textTransform: 'uppercase',
  },
  selectionAreaItemAccordion:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    width: 140.5,
  },
  dateFilterContainer: {
    paddingVertical: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    ...Fonts.Roboto40016,
    color: '#1E1E1E',
  },
  tagsScrollView: {
    maxHeight: 105,
  },
  Button: {
    backgroundColor: theme.FilterButton,
    color: theme.text2,
  }
});

export default getStyles;
