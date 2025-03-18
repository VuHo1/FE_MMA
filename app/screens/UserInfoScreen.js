import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserInfoScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            const storedUserInfo = await AsyncStorage.getItem("userInfo");
            if (storedUserInfo) {
                const userInfo = JSON.parse(storedUserInfo);
                setPhoneNumber(userInfo.phoneNumber || "");
                setAddress(userInfo.address || "");
            }
        } catch (error) {
            console.error("Lỗi khi tải thông tin người dùng:", error);
        }
    };

    const saveUserInfo = async () => {
        if (!phoneNumber || !address) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const userInfo = { phoneNumber, address };
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        Alert.alert("Thành công", "Thông tin đã được lưu.");

        navigation.navigate("Payment");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin người dùng</Text>
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={address}
                onChangeText={setAddress}
            />
            <Button title="Lưu thông tin" onPress={saveUserInfo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default UserInfoScreen;
