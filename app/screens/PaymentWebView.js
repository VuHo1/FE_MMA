import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebView = ({ route }) => {
    const { url } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator size="large" color="blue" />}
            />
        </View>
    );
};

export default PaymentWebView;
