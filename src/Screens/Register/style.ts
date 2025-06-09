import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: theme.background,
      alignItems: 'center',
      flexGrow: 1,
    },
    form: {
      flex: 1,
      
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 13,
      backgroundColor: '#AAAAAA',
      height: 50,
      width: 110,
      borderRadius: 10,
    },
    backText: {
      color: theme.text2,
      ...Fonts.Roboto50018,
    },
    inputSpacing: {
      marginBottom: 40,
      width:329,
      height:47,
    },
    buttonSpacing: {
      marginTop: 16,
    },
    title: {
      ...Fonts.Roboto70024,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 20,
      color: theme.text,
    },

    createButton: {
      backgroundColor: '#5B3CC4',
      width: 329,
      height:47,
      marginTop:8,
    },

  });

export default getStyles;
