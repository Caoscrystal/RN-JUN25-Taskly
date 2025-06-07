import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../../Navigation/types';
import Button from '../../components/button';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import Modal from './Modal';
import {API_BASE_URL} from '../../env';
import * as Keychain from 'react-native-keychain';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';


import avatar1 from '../../Assets/Images/Avatars/avatar_1.png';
import avatar2 from '../../Assets/Images/Avatars/avatar_2.png';
import avatar3 from '../../Assets/Images/Avatars/avatar_3.png';
import avatar4 from '../../Assets/Images/Avatars/avatar_4.png';
import avatar5 from '../../Assets/Images/Avatars/avatar_5.png';

const AVATARS = [
  {id: 'avatar_1', source: avatar1, borderColor: '#6C4AE4'},
  {id: 'avatar_2', source: avatar2, borderColor: '#E4B14A'},
  {id: 'avatar_3', source: avatar3, borderColor: '#4AE47B'},
  {id: 'avatar_4', source: avatar4, borderColor: '#E44A4A'},
  {id: 'avatar_5', source: avatar5, borderColor: '#B89B5B'},
];

const AVATAR_SIZE = 100;
const AVATAR_MARGIN = 12;
const GRAY_BORDER = '#D1D5DB';

export default function AvatarSelector() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'AvatarSelector'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'AvatarSelector'>
    >();
  const {isEditing = false} = route.params || {};

  useEffect(() => {
    const backAction = () => {
      if (!isEditing) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isEditing]);

  const handleConfirmCadastro = async () => {
    if (!selectedId) {
      Alert.alert('Por favor, selecione um avatar antes de continuar.');
      return;
    }

    console.log('API_BASE_URL:', API_BASE_URL);

    try {
      const credentials = await Keychain.getGenericPassword();

      if (!credentials || !credentials.password) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }

      const token = credentials.password;

      console.log('Token usado para armazenar avatar:', token);

      await Keychain.setGenericPassword(
        'auth',
        JSON.stringify({idToken: token, avatar: selectedId}),
      );

      console.log('Avatar armazenado com sucesso!');

      setIsModalVisible(true);
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação.');
    }
  };

  const handleConfirmEdicao = async () => {
    if (!selectedId) {
      Alert.alert('Por favor, selecione um avatar antes de continuar.');
      return;
    }

    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials || !credentials.password) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }

      const token = credentials.password;

      console.log('Token usado para atualizar avatar:', token);
      console.log('Avatar selecionado:', selectedId);

      // Buscar os dados do perfil do usuário
      const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!profileResponse.ok) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
        return;
      }

      const profileData = await profileResponse.json();
      console.log('Dados do perfil carregados:', profileData);

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileData.name,
          phone_number: profileData.phone_number,
          picture: selectedId,
        }),
      });

      console.log('Resposta da API:', response.status);

      if (response.ok) {
        setIsModalVisible(true);
      } else {
        const errorResponse = await response.json();
        console.error('Erro ao atualizar avatar:', errorResponse);
        Alert.alert('Erro', 'Não foi possível atualizar o avatar.');
      }
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação.');
    }
  };

  const handleModalClose = () => {
    if (!isModalVisible) {return;}

    setIsModalVisible(false);

    navigation.reset({
      index: 0,
      routes: [{name: isEditing ? 'MainApp' : 'Login'}],
    });
  };

  const handleAvatarPress = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.headerContainer}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={1} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.textAvatar}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.textPick}>(Escolha somente um.)</Text>
      </View>
      <View style={styles.avatarsRow}>
        {AVATARS.map(avatar => {
          const isSelected = selectedId === avatar.id;
          const isDimmed = selectedId && !isSelected;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarTouchable,
                {
                  borderColor: selectedId
                    ? isSelected
                      ? avatar.borderColor
                      : GRAY_BORDER
                    : avatar.borderColor,
                  borderWidth: 3,
                  borderRadius: AVATAR_SIZE / 2,
                  margin: AVATAR_MARGIN / 2,
                  overflow: 'hidden',
                  padding: 0,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleAvatarPress(avatar.id)}>
              <Image
                source={avatar.source}
                style={{
                  position: 'absolute',
                  left: -(AVATAR_SIZE * 0.1),
                  top: 0,
                  width: AVATAR_SIZE * 1.2,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                }}
                resizeMode="cover"
              />
              {isDimmed && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: AVATAR_SIZE * 1.2,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        title={isEditing ? 'CONFIRMAR EDIÇÃO' : 'CONFIRMAR SELEÇÃO'}
        fontFamily="Roboto60020"
        backgroundColor={theme.FilterButton}
        width={Dimensions.get('window').width * 0.9}
        style={styles.confirmButton}
        onPress={isEditing ? handleConfirmEdicao : handleConfirmCadastro}
      />
      <Modal
        visible={isModalVisible}
        title={
          isEditing ? 'Perfil atualizado' : 'Cadastro realizado com sucesso!'
        }
        description={
          isEditing
            ? 'Suas informações foram salvas com sucesso.'
            : 'Você será direcionado para a tela de login!'
        }
        confirmText="OK"
        confirmColor="#32C25B"
        onClose={handleModalClose}
      />
    </View>
  );
}
