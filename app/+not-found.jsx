import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function NotFoundScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-base-100">
            <Text className="text-base-content text-2xl font-bold">Esta vísta no existe.</Text>
            <Link href="/" className="text-primary underline mt-4">Ir a la pantalla principal!</Link>
        </View>
    );
}
