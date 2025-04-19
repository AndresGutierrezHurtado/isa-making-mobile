import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

// Contexts
import { useAuth } from "../../../contexts/authContext";

// Hooks
import { useGetData } from "../../../hooks/useFetchData";

// Components
import AppLoading from "../../../components/loading";

export default function orders() {
    const { data: user } = useAuth();
    const { data: orders, loading } = useGetData(`/users/${user.user_id}/orders`);

    const router = useRouter();

    if (loading) return <AppLoading />;

    return (
        <ScrollView className="flex-1 bg-base-100">
            <View className="flex-1 p-5 gap-10">
                <Text className="text-2xl font-Otomanopee text-base-content">Mis pedidos</Text>
                {orders.length === 0 && (
                    <Text className="text-base-content font-Afacad text-center">
                        No tienes ningún pedido
                    </Text>
                )}
                <View className="gap-5">
                    {orders.map((order) => {
                        const totalPrice = order.products.reduce(
                            (acc, product) =>
                                acc + product.product_price * product.product_quantity,
                            0
                        );
                        const totalQuantity = order.products.reduce(
                            (acc, product) => acc + product.product_quantity,
                            0
                        );
                        return (
                            <View key={order.order_id} className="bg-base-200 rounded-lg p-5 gap-4">
                                <View className="flex-row justify-between">
                                    <Text className="text-base-content font-Afacad font-bold text-lg">
                                        Pedido #{order.order_id.split("-")[0]}
                                    </Text>
                                    <Text className="text-base-content font-Afacad text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View className="gap-2">
                                    <Text className="text-base-content font-Afacad">
                                        Numero de envio: {order.shipping.shipping_guide}
                                    </Text>
                                    <View className="flex-row justify-between">
                                        <Text className="text-base-content font-Afacad">
                                            Cantidad: {totalQuantity}
                                        </Text>
                                        <Text className="text-base-content font-Afacad">
                                            Total: {parseInt(totalPrice).toLocaleString("es-CO")}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-between">
                                    <Pressable
                                        onPress={() => router.push(`/orders/${order.order_id}`)}
                                        className="bg-primary active:bg-primary/80 rounded-lg p-2"
                                    >
                                        <Text className="text-base-content font-Afacad text-center">
                                            Ver Detalles
                                        </Text>
                                    </Pressable>
                                    <Text
                                        className="text-base-content font-Afacad text-sm rounded-lg px-2 py-1"
                                        style={{
                                            color:
                                                order.order_state === "pending"
                                                    ? "yellow"
                                                    : "green",
                                            borderColor:
                                                order.order_state === "pending"
                                                    ? "yellow"
                                                    : "green",
                                            borderWidth: 1,
                                        }}
                                    >
                                        {order.order_state}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
