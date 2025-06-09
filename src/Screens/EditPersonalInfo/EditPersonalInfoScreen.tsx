import React, {useState, useEffect, useCallback} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../Navigation/types';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';
import {API_BASE_URL} from '../../env';
import * as Keychain from 'react-native-keychain';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditPersonalInfo'
>;

function EditPersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const fetchUserProfile = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials || !credentials.password) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${credentials.password}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setName(data.name || '');
        setPhone(data.phone_number || '');
      } else if (response.status === 401) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível carregar as informações do perfil.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar as informações do perfil. Faça login novamente.',
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [navigation]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const validateName = (value: string): string | null => {
    if (!value) {
      return 'Campo obrigatório';
    }
    const parts = value.trim().split(' ').filter(Boolean);
    if (parts.length < 2 || parts[1].length < 3) {
      return 'Digite o nome completo';
    }
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      return 'Campo obrigatório';
    } else if (cleaned.length !== 11) {
      return 'Número inválido';
    }
    return null;
  };

  const handleContinue = () => {
    const localNameError = validateName(name);
    const localPhoneError = validatePhone(phone);

    setNameError(localNameError || '');
    setPhoneError(localPhoneError || '');

    if (!localNameError && !localPhoneError) {
      const cleanedPhone = phone.replace(/\D/g, '');

      navigation.navigate('AvatarSelector', {
        name,
        phone_number: cleanedPhone,
        isEditing: true, // Fluxo de edição de perfil
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={0.5} />
          <Input
            label="Nome Completo"
            value={name}
            onChangeText={text => {
              setName(text);
              if (nameError) {
                setNameError('');
              }
            }}
            onBlur={() => setNameError(validateName(name) || '')}
            error={nameError}
            placeholder="Digite seu nome"
            containerStyle={styles.inputSpacing}
          />
          <Input
            label="E-mail"
            value={email}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            containerStyle={styles.inputSpacing}
            editable={false}
          />
          <Input
            label="Número"
            value={phone}
            onChangeText={text => {
              setPhone(text);
              if (phoneError) {
                setPhoneError('');
              }
            }}
            onBlur={() => setPhoneError(validatePhone(phone) || '')}
            error={phoneError}
            //  mask="phone"
            containerStyle={styles.inputSpacing}
          />
          <Button
            title="CONTINUAR"
            onPress={handleContinue}
            width="100%"
            fontFamily="Roboto60020"
            style={styles.buttonSpacing}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default EditPersonalInfoScreen;
