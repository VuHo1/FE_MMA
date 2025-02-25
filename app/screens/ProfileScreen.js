import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>👤 Hồ sơ cá nhân</Text>
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ProfileScreen;
