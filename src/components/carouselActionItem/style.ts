import { StyleSheet } from 'react-native';
import { ThemeType } from '../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        padding: 15,
        width: 120,
        height: 120,
        borderRadius: 10,
        marginHorizontal: 8,
        backgroundColor: theme.Habilitarbutton,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 6,
      },
      icon: {
       position: 'absolute',
       bottom: '22%',
       left: '15%',
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.carouselText,

      },
});

export default getStyles;
