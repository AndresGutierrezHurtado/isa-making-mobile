import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function AppLoading() {
    return (
        <View className="flex-1 items-center justify-center bg-base-100">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-base-content/70 text-2xl font-medium">Cargando...</Text>
        </View>
    );
}
