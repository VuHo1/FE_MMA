import React from 'react';
import { View, Text, Button } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>💳 Thanh toán</Text>
            <Button title="Quay về trang chủ" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default CheckoutScreen;
