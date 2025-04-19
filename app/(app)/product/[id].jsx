import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import Markdown from "react-native-markdown-display";

// Hooks
import { useGetData, usePostData } from "../../../hooks/useFetchData";

// Components
import AppLoading from "../../../components/loading";

// Hooks
import { useAuth } from "../../../contexts/authContext";

export default function Product() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data: user } = useAuth();
    const { data: product, loading } = useGetData(`/products/${id}`);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    if (loading) return <AppLoading />;
    const images = [
        {
            id: 1,
            image: product.product_image,
            alt: product.product_id,
        },
        ...product.medias.map((media, idx) => ({
            id: idx + 2,
            image: media.media_image,
            alt: media.media_id,
        })),
    ];

    const currentSize =
        product.sizes.find((size) => size.size_slug === selectedSize) || product.sizes[0];

    const handleAddToCart = async () => {
        const FetchData = {
            product_id: product.product_id,
            size_id: currentSize.size_id,
        };

        await usePostData(`/users/${user.user_id}/cart`, FetchData);
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: product.product_name,
                    headerStyle: { backgroundColor: "#27272a", borderBottomColor: "#3f3f46" },
                    headerTitleStyle: { color: "#fafafa", fontFamily: "Afacad" },
                    headerTintColor: "#fafafa",
                }}
            />
            <ScrollView className="flex-1 bg-base-100 ">
                <View className="flex-1 p-5 gap-5">
                    <View className="gap-2">
                        <Image
                            source={{
                                uri: selectedImage
                                    ? images.find((image) => image.id === selectedImage).image
                                    : product.product_image,
                            }}
                            className="w-full aspect-[10/12] rounded-lg"
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-8 py-2">
                                {images.map((image) => {
                                    const selectedImg = selectedImage
                                        ? selectedImage === image.id
                                        : image.id == 1;
                                    return (
                                        <Pressable
                                            onPress={() => setSelectedImage(image.id)}
                                            key={image.id}
                                            className="w-28 h-28 rounded overflow-hidden"
                                            style={{
                                                borderWidth: selectedImg ? 2 : 0,
                                                borderColor: "#3b82f6",
                                            }}
                                        >
                                            <Image
                                                source={{ uri: image.image }}
                                                className="w-full h-full"
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <Text className="text-base-content font-Otomanopee text-2xl">
                        {product.product_name}
                    </Text>
                    <View className="gap-0">
                        <View className="flex-row gap-2">
                            <Text className="text-base-content font-Afacad text-lg">Color: </Text>
                            <View
                                className="w-6 h-6 rounded-full border-2 border-base-content"
                                style={{ backgroundColor: product.product_color }}
                            ></View>
                        </View>
                        <View className="flex-row gap-2">
                            <Text className="text-base-content font-Afacad text-2xl">
                                {parseInt(currentSize.ProductSize.product_price).toLocaleString(
                                    "es-CO"
                                )}
                            </Text>
                        </View>
                        <Text className="text-base-content/60 font-Afacad text-lg">
                            {product.product_stock} Unidades disponibles
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        {product.sizes.map((size) => (
                            <Pressable
                                onPress={() => setSelectedSize(size.size_slug)}
                                className="bg-base-300 rounded w-12 h-9 flex items-center justify-center"
                                style={{
                                    backgroundColor: "#27272a",
                                    borderWidth: currentSize.size_slug === size.size_slug ? 1 : 0,
                                    borderColor: "#3f3f46",
                                }}
                                key={size.size_id}
                            >
                                <Text className="text-base-content font-Afacad text-lg">
                                    {size.size_slug}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <View className="flex-row gap-2 my-2 w-full">
                        <Pressable
                            onPress={handleAddToCart}
                            className="bg-primary rounded p-3 py-1.5 w-full"
                        >
                            <Text className="text-base-content font-Afacad text-lg text-center">
                                Add to Cart
                            </Text>
                        </Pressable>
                    </View>
                    <View className="gap-4">
                        <Text className="text-base-content font-Otomanopee text-2xl ">
                            Descripción del producto:
                        </Text>
                        <Markdown
                            style={{
                                paragraph: { color: "#fafafa", fontFamily: "Afacad" },
                                heading1: { color: "#fafafa", fontFamily: "Otomanopee" },
                                heading2: { color: "#fafafa", fontFamily: "Otomanopee" },
                                heading3: { color: "#fafafa", fontFamily: "Otomanopee" },
                                heading4: { color: "#fafafa", fontFamily: "Otomanopee" },
                                heading5: { color: "#fafafa", fontFamily: "Otomanopee" },
                                heading6: { color: "#fafafa", fontFamily: "Otomanopee" },
                                strong: { color: "#fafafa", fontFamily: "Afacad" },
                                hr: { borderColor: "#fafafa", borderWidth: 1, marginVertical: 10 },
                                bullet_list: { color: "#fafafa", fontFamily: "Afacad" },
                                ordered_list: { color: "#fafafa", fontFamily: "Afacad" },
                                list_item: { color: "#fafafa", fontFamily: "Afacad" },
                            }}
                        >
                            {product.product_description}
                        </Markdown>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
