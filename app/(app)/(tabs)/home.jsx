import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useGetData } from "../../../hooks/useFetchData";
import AppLoading from "../../../components/loading";
import { Link, Stack } from "expo-router";

export default function Home() {
    const { data: products, loading: loadingProducts } = useGetData("/products?limit=8");

    if (loadingProducts) return <AppLoading />;
    return (
        <ScrollView className="flex-1 bg-base-100">
            <View className="p-5 pt-10 gap-3">
                <Text className="text-base-content text-5xl font-bold">
                    Bienvenido a{" "}
                    <Text className="text-primary font-Otomanopee uppercase">Isa Making</Text>
                </Text>
                <Text className="text-base-content/90 font-afacad text-lg leading-[120%]">
                    La vida es muy corta para seguir usando prendas aburridas. Viste tu actitud con
                    LSA Making ropa urbana: Camisetas, jeans, gorras, accesorios y mucho más.
                </Text>
            </View>
            <View className="p-5 gap-8 mb-[90px]">
                <Text className="text-base-content font-afacad text-2xl font-bold uppercase">
                    Nuestros productos
                </Text>
                <View className="gap-4">
                    {products.map((product) => (
                        <View
                            key={product.product_id}
                            className="flex-row bg-base-200 border border-base-300 rounded-lg overflow-hidden"
                        >
                            <Link href={`/product/${product.product_id}`}>
                                <View className="w-24 aspect-[11/13] flex items-center justify-center overflow-hidden">
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
                                    $
                                    {parseInt(
                                        product.sizes[0].ProductSize.product_price
                                    ).toLocaleString("es-CO")}
                                </Text>
                                <Text className="text-base-content/60 font-afacad text-xs">
                                    {product.product_stock} unidades disponibles
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
