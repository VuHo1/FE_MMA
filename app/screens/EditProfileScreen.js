import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("access_token");

            if (!token) {
                Alert.alert("Lỗi", "Không tìm thấy token.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://192.168.56.1:8000/api/v1/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    _id: user._id,
                    name: name,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
                navigation.goBack();
            } else {
                Alert.alert("Lỗi", result.message || "Không thể cập nhật hồ sơ.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>✏️ Chỉnh sửa hồ sơ</Text>
            <Text style={styles.label}>Tên:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            {loading ? <ActivityIndicator size="large" color="#007bff" /> : <Button title="Lưu thay đổi" onPress={handleSave} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    label: { fontSize: 18, marginBottom: 5, color: "#333" },
    input: { width: "80%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
});

export default EditProfileScreen;
