import React from 'react';
import { View, Text, Button } from 'react-native';

const CartScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>🛒 Giỏ hàng</Text>
            <Button title="Thanh toán" onPress={() => navigation.navigate('Checkout')} />
        </View>
    );
};

export default CartScreen;
