import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CarouselActionList} from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal';
import styles from './style';
import {API_BASE_URL} from '../../../env';

import {
  getToken,
  removeToken,
  refreshAuthToken,
} from '../../../Utils/authUtils';

const avatarMap: Record<string, any> = {
  avatar_1: require('../../../Assets/Images/Avatars/avatar_1.png'),
  avatar_2: require('../../../Assets/Images/Avatars/avatar_2.png'),
  avatar_3: require('../../../Assets/Images/Avatars/avatar_3.png'),
  avatar_4: require('../../../Assets/Images/Avatars/avatar_4.png'),
  avatar_5: require('../../../Assets/Images/Avatars/avatar_5.png'),
};


type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({navigation, route}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: '', // Adicionado para armazenar o avatar
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      console.log('Tentando buscar perfil do usuário...');
      const token = await getToken();

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      console.log('Token usado para buscar perfil:', token);

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dados do perfil:', data);
        setUserData({
          name: data.name || 'Usuário',
          email: data.email || 'Email não disponível',
          phone: data.phone_number || 'Telefone não disponível', // Atualizado para usar phone_number
          avatarUrl: data.picture || '', // Atualizado para usar picture
        });
      } else if (response.status === 401) {
        console.log('Token inválido ou expirado. Tentando renovar...');
        try {
          const newToken = await refreshAuthToken();
          console.log('Token renovado com sucesso:', newToken);

          // Tentar buscar o perfil novamente com o novo token
          const retryResponse = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            console.log('Dados do perfil com novo token:', data);
            setUserData({
              name: data.name || 'Usuário',
              email: data.email || 'Email não disponível',
              phone: data.phone_number || 'Telefone não disponível',
              avatarUrl: data.picture || '',
            });
          } else {
            throw new Error('Erro ao buscar perfil com novo token.');
          }
        } catch (refreshError) {
          console.error('Erro ao renovar o token:', refreshError);
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
          await removeToken();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } else {
        console.error('Erro ao buscar perfil:', response.status);
        Alert.alert(
          'Erro',
          'Não foi possível carregar as informações do perfil.',
        );
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [navigation]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (route.params?.showConfirmationModal && !hasShownModal) {
      setIsModalVisible(true);
      setHasShownModal(true);
    }
  }, [route.params, hasShownModal]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileSection}>
        <Image
          source={
            userData.avatarUrl && avatarMap[userData.avatarUrl]
              ? avatarMap[userData.avatarUrl]
              : require('../../../Assets/Images/Avatars/avatar_5.png')
          }
          style={styles.avatar}
        />
        <View style={styles.containerInfo}>
          <Text style={[styles.profileText, styles.profileNome]}>
            {userData.name}
          </Text>
          <Text style={styles.profileText}>{userData.email}</Text>
          <Text style={styles.profileText}>{userData.phone}</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <CarouselActionList />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreferencesMenu')}>
          <Text style={styles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Regulamentos')}>
          <Text style={styles.buttonText}>Termos e regulamentos</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        title="Perfil atualizado"
        description="Suas informações foram salvas com sucesso."
        confirmText="FECHAR"
        confirmColor="#4CAF50"
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default MenuPrincipal;
