import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import { Link, useRouter } from "expo-router";

// Hooks
import { useValidateForm } from "../../hooks/useValidateForm";
import { usePostData } from "../../hooks/useFetchData";
import { storage } from "../../utils/storage";

export default function Login() {
    const router = useRouter();

    const handleSubmit = async (values) => {
        const validation = useValidateForm("login-form", values);

        if (!validation.success) return alert(validation.message);

        const { data, success } = await usePostData("/auth/login", values);

        if (!success) return;

        await storage.setItem("auth_token", data.token);
        router.push("/");
    };

    return (
        <View className="flex-1 bg-base-100 justify-center p-10 gap-6">
            <View>
                <Pressable
                    onPress={() => router.push("/")}
                    className="mb-[60px] active:opacity-80 duration-300"
                >
                    <Text className="text-base-content font-Otomanopee text-3xl text-center">
                        ISA MAKING
                    </Text>
                </Pressable>
                <Text className="text-3xl font-bold text-base-content">Iniciar Sesión</Text>
                <Text className="text-base-content opacity-80">
                    Inicia sesión para acceder a tu cuenta
                </Text>
            </View>
            <View className="bg-base-200 p-5 rounded-lg shadow-lg border border-base-300 shadow-base-300">
                <Formik
                    initialValues={{
                        user_email: "",
                        user_password: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <View className="gap-3">
                            <View className="gap-1">
                                <Text className="text-base-content/70">Correo electrónico</Text>
                                <TextInput
                                    className="placeholder:text-base-content/90 px-2 py-1 border border-base-300 rounded focus:outline-none focus:border-primary text-base-content"
                                    placeholder="Ingresa tu correo electrónico"
                                    onChangeText={handleChange("user_email")}
                                    value={values.user_email}
                                />
                            </View>
                            <View className="gap-1">
                                <Text className="text-base-content/70">Contraseña</Text>
                                <TextInput
                                    className="placeholder:text-base-content/90 px-2 py-1 border border-base-300 rounded focus:outline-none focus:border-primary text-base-content"
                                    placeholder="Ingresa tu contraseña"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("user_password")}
                                    value={values.user_password}
                                />
                            </View>
                            <Text className="text-base-content">
                                ¿No tienes una cuenta?
                                <Link href="/register" className="text-primary underline ml-1">
                                    Regístrate
                                </Link>
                            </Text>
                            <Pressable
                                className="bg-primary rounded px-5 py-2 grow active:opacity-80 duration-300 mt-3"
                                onPress={handleSubmit}
                            >
                                <Text className="text-base-content text-center">
                                    Iniciar sesión
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}
