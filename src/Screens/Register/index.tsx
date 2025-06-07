import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import BiometryModal from './BiometryResgister';
import {registerUser} from '../../hooks/useApi';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigation/types';
import {} from '../../Utils/authUtils';

export const storeToken = async (idToken: string, refreshToken?: string) => {
  try {
    if (!idToken) {
      throw new Error('O idToken é obrigatório para armazenar os tokens.');
    }

    // Armazenar os tokens como um objeto JSON
    const tokenData = JSON.stringify({idToken, refreshToken});
    await Keychain.setGenericPassword('auth', tokenData);
  } catch (error) {
    throw new Error('Erro ao salvar os tokens no Keychain.');
  }
};
export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBiometryModal, setShowBiometryModal] = useState(false);
  const [biometryApiLoading, setBiometryApiLoading] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);


  const validateName = (value: string): string | null => {
    if (!value) {
      return 'O nome é obrigatório.';
    }
    const parts = value.trim().split(' ').filter(Boolean);
    if (parts.length < 2 || parts[1].length < 3) {
      return 'Digite o nome completo.';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'O e-mail é obrigatório.';
    } else if (!emailRegex.test(email)) {
      return 'E-mail inválido.';
    }
    return null;
  };

  const validateNumber = (value: string): string | null => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      return 'O número é obrigatório.';
    } else if (cleaned.length !== 11) {
      return 'Número inválido. Deve conter 11 dígitos.';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password.trim()) {
      return 'A senha é obrigatória.';
    } else if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    return null;
  };

  const validateConfirmPassword = (confirmPassword: string): string | null => {
    if (!confirmPassword.trim()) {
      return 'A confirmação de senha é obrigatória.';
    } else if (confirmPassword !== password) {
      return 'As senhas não coincidem.';
    }
    return null;
  };

  const handleRegister = async () => {
    setLoading(true);
    console.log('Iniciando cadastro...');
    const cleanedPhoneNumber = number.replace(/\D/g, '');
    console.log(
      'Número de telefone formatado para registro:',
      cleanedPhoneNumber,
    );

    try {
      const response = await registerUser({
        email,
        password,
        name,
        phone_number: cleanedPhoneNumber,
      });

      console.log('Token retornado no registro:', response.data.idToken);
      console.log('UID retornado no registro:', response.data.uid);

      if (response.status === 200 || response.status === 201) {
        await storeToken(response.data.idToken);
        console.log('Cadastro concluído!');

        setShowBiometryModal(true);
      } else {
        console.error('Erro no cadastro:', response.data);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometryActivate = async () => {
    setBiometryApiLoading(true);
    console.log('Iniciando autenticação biométrica...');
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Erro', 'Biometria não disponível neste dispositivo.');
        setBiometryApiLoading(false);
        return;
      }

      console.log(`Tipo de biometria disponível: ${biometryType}`);

      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirme sua identidade',
      });

      if (success) {
        console.log('Autenticação biométrica bem-sucedida!');
        setShowBiometryModal(false);
        navigation.navigate('AvatarSelector', {
          isEditing: false,
          email,
          password,
          name,
          phone_number: number.replace(/\D/g, ''),
        });
      } else {
        console.log('Autenticação biométrica cancelada pelo usuário.');
      }
    } catch (error) {
      console.error('Erro durante a autenticação biométrica:', error);
      Alert.alert('Erro', 'Falha na autenticação biométrica.');
    } finally {
      setBiometryApiLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/icons/VectorBack.png')} />
            <Text style={styles.backText}>VOLTAR</Text>
          </TouchableOpacity>
          <Text style={styles.title}>CADASTRO</Text>

          <Input
            label="Nome Completo"
            value={name}
            onChangeText={text => {
              setName(text);
              if (nameError) {
                const error = validateName(text);
                setNameError(error || '');
              }
            }}
            onBlur={() => {
              const error = validateName(name);
              setNameError(error || '');
            }}
            error={nameError}
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="E-mail"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (emailError) {validateEmail(text);}
            }}
            onBlur={() => {
              const error = validateEmail(email);
              setEmailError(error || '');
            }}
            error={emailError}
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="Número"
            value={number}
            onChangeText={text => {
              setNumber(text);
              if (numberError) {
                const error = validateNumber(text);
                setNumberError(error || '');
              }
            }}
            onBlur={() => {
              const error = validateNumber(number);
              setNumberError(error || '');
            }}
            error={numberError}
            mask="phone"
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="Senha"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) {validatePassword(text);}
            }}
            onBlur={() => {
              const error = validatePassword(password);
              setPasswordError(error || '');
            }}
            error={passwordError}
            secureTextEntry
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="Confirmar senha"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (confirmPasswordError) {validateConfirmPassword(text);}
            }}
            onBlur={() => {
              const error = validateConfirmPassword(confirmPassword);
              setConfirmPasswordError(error || '');
            }}
            error={confirmPasswordError}
            secureTextEntry
            containerStyle={styles.inputSpacing}
          />
        </View>

        {loading && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateX: -25}, {translateY: -25}],
              zIndex: 9999,
            }}>
            <ActivityIndicator size="large" color="#5B3CC4" />
          </View>
        )}

        <Button
          title="CRIAR CONTA"
          fontFamily="Roboto60020"
          style={styles.createButton}
          onPress={handleRegister}
          disabled={loading}
        />
      </ScrollView>

      <BiometryModal
        visible={showBiometryModal}
        title="Ative o Desbloqueio por Biometria"
        description="Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar sua senha sempre que quiser."
        buttonLeftText="Agora não"
        buttonRightText="ATIVAR"
        loading={biometryApiLoading}
        onPressLeft={() => {
          if (!biometryApiLoading) {
            setShowBiometryModal(false);
            navigation.navigate('AvatarSelector', {
              isEditing: false,
              email,
              password,
              name,
              phone_number: number.replace(/\D/g, ''), // Passar o número formatado
            });
          }
        }}
        onPressRight={handleBiometryActivate}
      />
    </>
  );
}
