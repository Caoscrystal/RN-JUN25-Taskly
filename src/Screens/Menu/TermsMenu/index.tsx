import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import BackButton from '../../../components/BackButton';
import { useTheme } from '../../../Theme/ThemeContext';
import { ThemeType } from '../../../Theme/theme';

type Props = {
  navigation: any;
};

const TermosPage = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com o botão Voltar e o título 'Termos e Regulamentos' */}
      <View style={styles.header}>
        {/* Utilizando o BackButton aqui */}
        <BackButton onPress={() => navigation.goBack()} rightText="Termos e regulamentos" />
      </View>

      {/* Barra de Separação */}
      <View style={styles.separator} />

      {/* Carregar conteúdo da URL diretamente no WebView */}
      <WebView
        originWhitelist={['*']} // Permite carregar qualquer conteúdo
        source={{ uri: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/' }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: theme.background,
    marginVertical: 14,
  },
  webview: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TermosPage;
