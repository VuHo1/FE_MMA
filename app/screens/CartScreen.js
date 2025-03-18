import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const cartData = await AsyncStorage.getItem('cart');
            if (cartData) {
                setCart(JSON.parse(cartData));
            }
        } catch (error) {
            console.error('Lỗi khi tải giỏ hàng:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            if (totalPrice === 0) {
                Alert.alert("Thông báo", "Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
                return;
            }
    
            const userToken = await AsyncStorage.getItem('access_token'); 
            if (!userToken) {
                Alert.alert("Thông báo", "Bạn cần đăng nhập trước khi thanh toán.", [
                    { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
                    { text: "Hủy", style: "cancel" }
                ]);
                return;
            }
    
            const userInfo = await AsyncStorage.getItem('userInfo'); 
            if (!userInfo) {
                navigation.navigate("UserInfo"); 
            } else {
                navigation.navigate("Payment"); 
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra thông tin người dùng:", error);
        }
    };

    const updateQuantity = async (id, amount) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        );
        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = async (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => updateQuantity(item._id, -1)}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => updateQuantity(item._id, 1)}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => removeItem(item._id)}>
                                <Text style={styles.remove}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()}đ</Text>
            <Button title="Thanh toán" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10 },
    image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#ff6347', marginBottom: 5 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    quantityButton: { fontSize: 20, paddingHorizontal: 10, color: 'blue' },
    quantity: { fontSize: 16, marginHorizontal: 10 },
    remove: { fontSize: 20, color: 'red' },
    total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }
});

export default CartScreen;
