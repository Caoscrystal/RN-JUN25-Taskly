import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../Theme/theme';

const getStyles = (theme: ThemeType) => StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: theme.activeCircle,
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default getStyles;
