import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, Image, Pressable } from "react-native";

// Hooks
import { useGetData } from "../../../../hooks/useFetchData";

// Components
import AppLoading from "../../../../components/loading";

export default function OrderHistory() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data: order, loading } = useGetData(`/orders/${id}`);

    if (loading) return <AppLoading />;
    const { payment, shipping } = order;
    const histories = shipping.histories.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const firstHistory = histories[0];
    const lastHistory = histories[histories.length - 1];

    const getTitle = (state) => {
        switch (state) {
            case "pending":
                return "Preparando para ser enviado";
            case "ready":
                return "Listo para ser enviado";
            case "recoding":
                return "Recogido";
            case "shipping":
                return "En camino";
            case "delivered":
                return "Entregado";
            default:
                return "Error";
        }
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Historial de envio",
                    headerStyle: { backgroundColor: "#27272a", borderBottomColor: "#3f3f46" },
                    headerTitleStyle: { color: "#fafafa", fontFamily: "Afacad" },
                    headerTintColor: "#fafafa",
                }}
            />
            <ScrollView className="flex-1 bg-base-100">
                <View className="flex-1 p-5 gap-5">
                    <View>
                        <Text className="text-base-content font-Otomanopee text-lg">
                            Historial de Envio
                        </Text>
                        <Text className="text-base-content font-Afacad ">
                            Ultima actualización:{" "}
                            {new Date(firstHistory.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                    <View className="w-full my-2 border-t border-gray-300"></View>
                    <View className="gap-4">
                        {histories.map((history, idx) => {
                            return (
                                <View
                                    key={history.history_id}
                                    className="bg-base-200 border border-base-300 rounded-lg overflow-hidden p-3"
                                >
                                    {idx === histories.length - 1 ? (
                                        <Text className="text-base-content font-Afacad italic">
                                            Estado actual de tu envio
                                        </Text>
                                    ) : (
                                        <Text className="text-base-content font-Afacad italic">
                                            Paso por
                                        </Text>
                                    )}
                                    <Text className="text-base-content font-Afacad text-lg font-bold">
                                        {getTitle(history.shipping_state)}
                                    </Text>
                                    <Text className="text-base-content/80 font-Afacad">
                                        Fecha: {new Date(history.createdAt).toLocaleDateString()}
                                    </Text>
                                    {idx === histories.length - 1 && (
                                        <Text className="text-base-content font-Afacad">
                                            Fecha estimada:{" "}
                                            {new Date(
                                                new Date(history.createdAt).getTime() +
                                                    5 * 24 * 60 * 60 * 1000
                                            ).toLocaleDateString()}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                    <View className="w-full my-2 border-t border-gray-300"></View>
                    <View>
                        <Pressable
                            onPress={() => router.push(`/orders/${id}`)}
                            className="bg-base-200 active:opacity-60 border border-base-300 rounded-lg overflow-hidden px-5 py-1"
                        >
                            <Text className="text-base-content font-Afacad text-center">
                                Volver al pedido
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
