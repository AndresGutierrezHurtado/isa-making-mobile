import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, Image, Pressable } from "react-native";

// Hooks
import { useGetData } from "../../../hooks/useFetchData";

// Components
import AppLoading from "../../../components/loading";

export default function Order() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data: order, loading } = useGetData(`/orders/${id}`);

    if (loading) return <AppLoading />;
    const totalProducts = order.products.reduce(
        (acc, product) => acc + product.product_quantity,
        0
    );
    const { payment, shipping } = order;
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Detalles del pedido",
                    headerStyle: { backgroundColor: "#27272a", borderBottomColor: "#3f3f46" },
                    headerTitleStyle: { color: "#fafafa", fontFamily: "Afacad" },
                    headerTintColor: "#fafafa",
                }}
            />
            <ScrollView className="flex-1 bg-base-100">
                <View className="flex-1 p-5 gap-5">
                    <View>
                        <View className="flex-row justify-between">
                            <Text className="text-base-content font-Otomanopee text-lg">
                                Pedido #{order.order_id.split("-")[0]}
                            </Text>
                            <Text className="text-base-content font-Afacad ">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-base-content font-Afacad">
                                Numero de pedido: {order.order_id.split("-")[0]}
                            </Text>
                            <Text className="text-base-content font-Afacad">
                                Estado: {order.order_state}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-base-content font-Afacad">
                                Productos: {totalProducts}
                            </Text>
                        </View>
                        <Pressable onPress={() => router.push(`/orders/${id}/history`)} className="bg-base-200 active:opacity-60 border border-base-300 rounded-lg overflow-hidden px-5 py-1 mt-5">
                            <Text className="text-base-content font-Afacad text-center">
                                Ver Historial de Envio
                            </Text>
                        </Pressable>
                    </View>
                    <View className="w-full my-2 border-t border-gray-300"></View>
                    <View className="gap-4">
                        {order.products.map(({ product, size, ...rest }) => {
                            return (
                                <View
                                    key={product.product_id}
                                    className="flex-row bg-base-200 border border-base-300 rounded-lg overflow-hidden"
                                >
                                    <Link href={`/product/${product.product_id}`}>
                                        <View className="w-36 aspect-[11/13] flex items-center justify-center overflow-hidden">
                                            <Image
                                                source={{ uri: product.product_image }}
                                                className="w-full h-full object-cover"
                                                resizeMode="cover"
                                            />
                                        </View>
                                    </Link>
                                    <View className="flex-1 h-full p-5">
                                        <Link
                                            href={`/product/${product.product_id}`}
                                            className="text-base-content font-afacad font-bold uppercase w-full mb-2"
                                        >
                                            {product.product_name}
                                        </Link>
                                        <Text className="text-base-content/90 font-afacad text-sm">
                                            Talla: {size.size_slug}
                                        </Text>
                                        <Text className="text-base-content/60 font-afacad text-xs">
                                            Cantidad: {rest.product_quantity}
                                        </Text>
                                        <Text className="text-base-content/60 font-afacad text-xs">
                                            Precio: {rest.product_price}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View className="w-full my-2 border-t border-gray-300"></View>
                    <View className="gap-5">
                        <View className="gap-2">
                            <Text className="text-base-content font-Otomanopee text-lg leading-1">
                                Envio
                            </Text>
                            <View>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Courier: {shipping.shipping_courier}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Guía: {shipping.shipping_guide}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1 truncate line-clamp-1 text-ellipsis">
                                    URL de rastreo: {shipping.tracking_url}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Fecha del pedido: {new Date(shipping.createdAt).toLocaleDateString()}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    ID de envío: {shipping.shipping_id}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    ID del pedido: {shipping.order_id}
                                </Text>
                            </View>
                        </View>
                        <View className="gap-2">
                            <Text className="text-base-content font-Otomanopee text-lg leading-1">
                                Pago
                            </Text>
                            <View>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Método de pago: {payment.payment_method}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Valor: {payment.payment_amount}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Comprador: {payment.buyer_name}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Email: {payment.buyer_email}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Documento: {payment.buyer_document_type} {payment.buyer_document_number}
                                </Text>
                                <Text className="text-base-content font-Afacad leading-1">
                                    Fecha del pago: {new Date(payment.createdAt).toLocaleDateString()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
