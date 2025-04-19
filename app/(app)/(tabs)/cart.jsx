import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useGetData, usePutData } from "../../../hooks/useFetchData";
import AppLoading from "../../../components/loading";
import { useAuth } from "../../../contexts/authContext";
import { useRouter } from "expo-router";
export default function Cart() {
    const { data: user } = useAuth();
    const router = useRouter();
    const { data: cart, loading, reload } = useGetData(`/users/${user.user_id}/cart`);

    if (loading) {
        return <AppLoading />;
    }

    const countProducts = cart.reduce((acc, { product_quantity }) => acc + product_quantity, 0);
    const subtotal = cart.reduce(
        (acc, { size, product_quantity }) =>
            acc + size.ProductSize.product_price * product_quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    const handleUpdateCart = async (product_id, size_id, action = "increment") => {
        await usePutData(`/users/${user.user_id}/cart`, {
            product_id,
            size_id,
            action
        });

        reload();
    };

    return (
        <ScrollView className="flex-1 bg-base-100">
            <View className="flex-1 p-5 gap-10">
                <View className="bg-base-200 border border-base-300 p-5 gap-4 rounded">
                    <Text className="text-base-content font-Afacad font-bold text-2xl">
                        Resumen
                    </Text>
                    <View className="gap-2">
                        <Text className="text-base-content font-Afacad text-base">
                            {countProducts} productos
                        </Text>
                        <View className="w-full h-0.5 bg-base-content/60"></View>
                        <Text className="text-base-content font-Afacad text-base">
                            Subtotal: {parseInt(subtotal).toLocaleString("es-CO")}
                        </Text>
                        <View className="w-full h-0.5 bg-base-content/60"></View>
                        <Text className="text-base-content font-Afacad text-base">
                            Envio: {shipping}
                        </Text>
                        <View className="w-full h-0.5 bg-base-content/60"></View>
                        <Text className="text-base-content font-Afacad text-base">
                            Total: {parseInt(total).toLocaleString("es-CO")}
                        </Text>
                    </View>
                    <Pressable onPress={() => router.push(process.env.EXPO_PUBLIC_API_DOMAIN + "/checkout")} className="bg-primary rounded-lg p-2">
                        <Text className="text-base-content">Continuar con la compra</Text>
                    </Pressable>
                </View>
                <Text className="text-base-content font-Afacad font-bold text-3xl">Productos</Text>
                <View className="flex-1 gap-4 mb-[90px]">
                    {cart.map(({ cart_id, product_quantity, size, product }) => (
                        <View
                            key={cart_id}
                            className="flex-row gap-4 bg-base-200 border border-base-300 rounded min-h-44 h-44 overflow-hidden"
                        >
                            <Image
                                source={{ uri: product.product_image }}
                                className="h-full  aspect-[8/10]"
                            />
                            <View className="flex-1 p-5 h-full justify-between">
                                <View className="flex-1">
                                    <Text className="text-base-content font-Afacad font-bold text-lg leading-[100%]">
                                        {product.product_name}
                                    </Text>
                                    <Text className="text-base-content font-Afacad text-sm">
                                        {parseInt(size.ProductSize.product_price).toLocaleString(
                                            "es-CO"
                                        )}
                                    </Text>
                                </View>
                                <View className="flex-row items-center gap-4 mt-2">
                                    <Pressable onPress={() => handleUpdateCart(product.product_id, size.size_id, "decrement")} className="bg-primary active:opacity-50 rounded-lg px-4 p-1">
                                        <Text className="text-base-content">-</Text>
                                    </Pressable>
                                    <Text className="text-base-content font-Afacad text-sm">
                                        {product_quantity}
                                    </Text>
                                    <Pressable onPress={() => handleUpdateCart(product.product_id, size.size_id, "increment")} className="bg-primary active:opacity-50 rounded-lg px-4 p-1">
                                        <Text className="text-base-content">+</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
