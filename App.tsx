import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import Keychain from 'react-native-keychain';
import AppNavigator from './src/Navigation/index';
import { isTokenExpired, refreshAuthToken, removeToken } from './src/Utils/authUtils';

const App: React.FC = () => {
  const [isAuthenticated, ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const initializeApp = async () => {
    try {
      console.log('Inicializando o aplicativo...');
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const { password: storedToken, username: refreshToken } = credentials;

        if (!storedToken || isTokenExpired(storedToken)) {
          console.log('Token inválido ou expirado. Tentando renovar...');
          try {
            const newToken = await refreshAuthToken();
            await Keychain.setGenericPassword(refreshToken, newToken);
            console.log('Token renovado com sucesso!');
          } catch (error) {
            await removeToken();
          }
        } else {
          console.log('Token válido encontrado.');
        }
      } else {
        console.log('Nenhum token encontrado.');
      }
    } catch (error) {
      console.error('Erro ao inicializar o aplicativo:', error);
      Alert.alert('Erro', 'Não foi possível inicializar o aplicativo. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  initializeApp();
}, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B3CC4" />
      </View>
    );
  }

  return <AppNavigator isAuthenticated={isAuthenticated} />;
};

export default App;