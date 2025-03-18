import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({ phoneNumber: "", address: "" });
    const [cart, setCart] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadUserInfo();
        loadCart();
    }, []);

    const loadUserInfo = async () => {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        } else {
            Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng!");
            navigation.goBack();
        }
    };

    const loadCart = async () => {
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    };

    const saveUserInfo = async () => {
        if (!userInfo.phoneNumber || !userInfo.address) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        Alert.alert("Thành công", "Thông tin đã được cập nhật.");
        setIsEditing(false); 
    };

    const handlePayment = async () => {
        try {
            const order = {
                userInfo,
                cart,
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            };

            console.log("Đơn hàng:", order);
            Alert.alert("Thanh toán thành công!", "Cảm ơn bạn đã mua hàng.");
            await AsyncStorage.removeItem("cart");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanh toán</Text>

            {isEditing ? (
                <View style={styles.info}>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={userInfo.phoneNumber}
                        onChangeText={(text) => setUserInfo({ ...userInfo, phoneNumber: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ"
                        value={userInfo.address}
                        onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
                    />
                    <Button title="Lưu thông tin" onPress={saveUserInfo} />
                </View>
            ) : (
                <View style={styles.info}>
                    <Text>Số điện thoại: {userInfo.phoneNumber}</Text>
                    <Text>Địa chỉ: {userInfo.address}</Text>
                    <Button title="Chỉnh sửa" onPress={() => setIsEditing(true)} />
                </View>
            )}

            <Text style={styles.total}>
                Tổng tiền: {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}đ
            </Text>

            <Button title="Xác nhận thanh toán" onPress={handlePayment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    info: { marginBottom: 20, padding: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    total: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
});

export default PaymentScreen;
