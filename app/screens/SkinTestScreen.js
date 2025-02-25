import React from 'react';
import { View, Text, Button } from 'react-native';

const SkinTestScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>🔬 Làm bài kiểm tra loại da</Text>
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default SkinTestScreen;
