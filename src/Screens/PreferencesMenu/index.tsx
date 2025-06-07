import React, { useState } from "react";
import { View } from "react-native";
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import SettingCard from "../../components/SettingCard";
import ThemeModal from "./Modal";
import styles from "./style";

export default function PreferencesMenu() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
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
    )
}
