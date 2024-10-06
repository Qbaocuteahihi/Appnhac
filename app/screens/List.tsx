import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            Alert.alert("Thành công", "Bạn đã đăng xuất thành công!");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('Details')} title='Mở chi tiết' />
            <Button onPress={() => navigation.navigate('MusicPlayer')} title='Mở Music Player' />
            <Button onPress={handleLogout} title='Đăng xuất' />
        </View>
    );
};

export default List;