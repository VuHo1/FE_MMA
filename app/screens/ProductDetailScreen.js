import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;

    const addToCart = async () => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            let cart = existingCart ? JSON.parse(existingCart) : [];
            const productIndex = cart.findIndex(item => item._id === product._id);

            if (productIndex !== -1) {
                cart[productIndex].quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
            <Text style={styles.rating}>⭐ {product.averageRating} / 5</Text>
            <Button title="Thêm vào giỏ hàng" onPress={addToCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#fff' },
    image: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
    name: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    description: { fontSize: 16, textAlign: 'center', marginBottom: 10, color: '#666' },
    price: { fontSize: 18, fontWeight: 'bold', color: '#ff6347', marginBottom: 10 },
    rating: { fontSize: 16, color: '#888', marginBottom: 10 },
    header: { alignSelf: 'flex-end', marginBottom: 10 }

});

export default ProductDetailScreen;