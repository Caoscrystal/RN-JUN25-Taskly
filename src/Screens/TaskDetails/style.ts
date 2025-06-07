import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 32,
    backgroundColor: theme.background,
    marginBottom: 20,
  },
  containerEdit:{
    justifyContent: 'center',
    gap: 16,
  },
  taskDetailsContainer: {
    backgroundColor: theme.Habilitarbutton,
    padding: 24,
    gap: 16,
    borderRadius: 12,
    width: 342,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    ...Fonts.Roboto60020,
    color: theme.text,
    marginBottom: 4,
  },
  titleTag: {
    ...Fonts.Roboto50018,
    color: theme.text,
  },
  description: {
    ...Fonts.Roboto40016,
    color: theme.text,
  },
  priority: {
    ...Fonts.Roboto40016,
    color: '#FFFFFF',
    backgroundColor: '#32C25B',
    padding: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    textTransform: 'uppercase',
  },
  carousel: {
    flexDirection: 'row',
    maxWidth: 190,
    flexWrap: 'wrap',
    gap: 4,
  },
  resolveButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#5B3CC4',
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 2,
  },
  resolveButtonText: {
    ...Fonts.Roboto40016,
    color: '#5B3CC4',
    textTransform: 'uppercase',
  },
  reopenButton: {
    alignItems: 'center',
    backgroundColor: '#E63946',
    borderRadius: 8,
    paddingVertical: 2,
  },
  reopenButtonText: {
    ...Fonts.Roboto40016,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: theme.Inputborder,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    ...Fonts.Roboto40016,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  addSubtaskInputContainer: {
    height: 70,
  },
  confirmButton: {
    backgroundColor: '#5B3CC4',
    paddingVertical: 12,
    paddingHorizontal: 24.75,
    borderRadius: 8,
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  bottomSpace: {
    height: 50,
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
  },
  editButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24.75,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5B3CC4',
  },
  cancelButtonText: {
    ...Fonts.Roboto60020,
    color: '#5B3CC4',
    textTransform: 'uppercase',
  },
  confirmButtonText: {
    ...Fonts.Roboto60020,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  confirmButtonCircle:{
    position: 'absolute',
    alignSelf:'flex-end',
    marginTop: 12,
    marginRight: 16,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E0F7',
    borderRadius: 8,
    padding: 4,
    gap: 4,
    marginRight: 4,
  },
  tagText: {
    ...Fonts.Roboto40016,
    color: '#1E1E1E',
    textTransform: 'uppercase',
  },
  removeTagButton: {
    color: '#F44336',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5B3CC4',
  },
  priorityButtonActive: {
    backgroundColor: '#32C25B',
    borderColor: 'transparent',
  },
  priorityText: {
    color: '#5B3CC4',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  priorityTextActive:{
    color: '#FFFFFf',
  },
  zeroedBottomInput:{
    marginBottom: 0,
  },
  tagsInput:{
    marginBottom: 12,
  },
  tagsInputError:{
    marginBottom: 20,
  },
  descriptionInput:{
    marginBottom: 32,
  },

});

export default getStyles;
