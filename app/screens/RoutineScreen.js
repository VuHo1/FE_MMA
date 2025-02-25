import React from 'react';
import { View, Text, Button } from 'react-native';

const RoutineScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>💆 Lộ trình chăm sóc da</Text>
            <Button title="Chi tiết sản phẩm" onPress={() => navigation.navigate('ProductDetail')} />
        </View>
    );
};

export default RoutineScreen;
