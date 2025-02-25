import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductDetailScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>🛍 Chi tiết sản phẩm</Text>
            <Button title="Thêm vào giỏ hàng" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};

export default ProductDetailScreen;
