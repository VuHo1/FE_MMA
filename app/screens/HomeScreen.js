import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>🏠 Màn hình chính</Text>
            <Button title="Làm bài kiểm tra loại da" onPress={() => navigation.navigate('SkinTest')} />
            <Button title="Lộ trình chăm sóc da" onPress={() => navigation.navigate('Routine')} />
            <Button title="Giỏ hàng" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};

export default HomeScreen;
