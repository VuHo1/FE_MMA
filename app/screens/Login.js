import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await fetch("http://192.168.56.1:8000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem("access_token", data.data.access_token);
                await AsyncStorage.setItem("user_data", JSON.stringify(data.data.user));
    
                Alert.alert("Thành công", "Đăng nhập thành công!");
                navigation.replace("Home");
            } else {
                Alert.alert("Lỗi", data.message || "Đăng nhập thất bại.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
        }
        setLoading(false);
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Đang xử lý..." : "Đăng nhập"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "100%", height: 50, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
    loginButton: { height: 50, width: "100%", backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", borderRadius: 8 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
