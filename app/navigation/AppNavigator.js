import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import thư viện icon

import HomeScreen from '../screens/HomeScreen';
import SkinTestScreen from '../screens/SkinTestScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import PaymentWebView from '../screens/PaymentWebView';
import PaymentScreen from '../screens/PaymentScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

// Tạo Stack cho từng nhóm màn hình
const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
            <Stack.Screen name="SkinTest" component={SkinTestScreen} options={{ title: 'Kiểm tra loại da' }} />
            <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'Lộ trình chăm sóc da' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Đăng Ký' }}/> 
            <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Thanh toán' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Hồ sơ cá nhân' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Đăng Nhập' }} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />

        </Stack.Navigator>
    );
};


// Tạo Bottom Tab
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'HomeStack') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#f4511e',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: '#fff', height: 60 },
                })}
            >
                {/* Stack chứa tất cả màn hình */}
                <Tab.Screen name="HomeStack" component={MainStack} options={{ title: 'Trang chủ', headerShown: false }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Hồ sơ' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

