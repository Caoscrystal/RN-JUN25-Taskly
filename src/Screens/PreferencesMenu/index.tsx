import React, { useState } from 'react';
import { View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import SettingCard from '../../components/SettingCard';
import ThemeModal from './Modal';
import getStyles from './style';
import { useTheme } from '../../Theme/ThemeContext';


export default function PreferencesMenu() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <BackButton
                onPress={() => navigation.goBack()}
                rightText="Preferências"
                />
            </View>
            <SettingCard onPress={() => setModalVisible(true)} />
            <ThemeModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}
