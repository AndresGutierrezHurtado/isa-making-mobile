import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();
    
    return (
        <View className="flex-1 flex-col bg-base-100">
            <View className="grow flex items-center justify-center">
                <Image
                    source={{
                        // uri: "https://static.vecteezy.com/system/resources/thumbnails/029/789/935/small_2x/hand-drawn-a-woman-with-shopping-bags-walks-past-a-storefront-in-flat-style-png.png",
                        uri: "https://png.pngtree.com/png-vector/20221022/ourmid/pngtree-group-of-young-people-in-urban-clothes-talking-png-image_6343216.png"
                    }}
                    resizeMode="contain"
                    className="w-full h-full mt-10"
                />
            </View>
            <View className="p-10 h-fit items-center gap-10">
                <View className="gap-4">
                    <Text className="text-3xl text-center font-bold text-base-content leading-[100%]">Compra <Text className="text-primary">las mejores</Text> prendas</Text>
                    <Text className="text-lg text-center text-base-content opacity-80 leading-[100%]">Autenticate con tu cuenta para acceder a tu tienda</Text>
                </View>
                <View className="flex-row gap-5 w-full">
                    <Pressable className="bg-primary rounded px-5 py-2 grow active:opacity-80 duration-300" onPress={() => router.push("/login")}>
                        <Text className="text-sm text-base-content text-center">Iniciar sesión</Text>
                    </Pressable>
                    <Pressable className="bg-transparent rounded px-5 py-2 grow border border-primary active:bg-primary/40 duration-300" onPress={() => router.push("/register")}>
                        <Text className="text-sm text-primary text-center">Registrarse</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
