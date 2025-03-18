import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem("user_data");
                if (userData) {
                    setUser(JSON.parse(userData));
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu user:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchUserData);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : user ? (
                <View style={styles.profileCard}>
                    <Text style={styles.title}>👤 Hồ sơ cá nhân</Text>
                    <Text style={styles.info}>Tên: <Text style={styles.boldText}>{user.name}</Text></Text>
                    <Text style={styles.info}>Email: <Text style={styles.boldText}>{user.email}</Text></Text>
                </View>
            ) : (
                <View style={styles.noUserContainer}>
                    <Text style={styles.noUser}>Bạn cần đăng nhập để xem thông tin cá nhân.</Text>
                </View>
            )}
            <Button title="Quay lại" onPress={() => navigation.goBack()} color="#007bff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8', 
        padding: 20,
    },
    profileCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    noUserContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    noUser: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
});

export default ProfileScreen;
