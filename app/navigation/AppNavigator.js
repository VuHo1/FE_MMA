import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import SkinTestScreen from '../screens/SkinTestScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
                <Stack.Screen name="SkinTest" component={SkinTestScreen} options={{ title: 'Kiểm tra loại da' }} />
                <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'Lộ trình chăm sóc da' }} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Thanh toán' }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Hồ sơ cá nhân' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
