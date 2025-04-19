import React from "react";
import { View, Text, ScrollView, TextInput, Pressable, Image } from "react-native";
import { Formik } from "formik";

// Contexts
import { useAuth } from "../../../contexts/authContext";

// Hooks
import { useValidateForm } from "../../../hooks/useValidateForm";
import { usePutData } from "../../../hooks/useFetchData";

export default function Profile() {
    const { data: user, reload } = useAuth();

    /**
     {
        "user_id": "b0abc550-c22b-4cca-bd50-62fc128512c6",
        "user_name": "Andrés",
        "user_lastname": "Gutiérrez Hurtado",
        "user_email": "andres52885241@gmail.com",
        "role_id": 2,
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "deletedAt": null,
        "role": {
            "role_id": 2,
            "role_name": "administrador"
        }
        } profile.jsx:8:12
     */

    const handleUpdate = async (values) => {
        const validation = useValidateForm("update-user-form", values);

        if (!validation.success) return alert(validation.message);

        const data = values;
        if (values.user_password === "") {
            delete data.user_password;
        }

        const response = await usePutData(`/users/${user.user_id}`, { user: data });

        if (!response.success) return;

        reload();
    };

    return (
        <ScrollView className="flex-1 bg-base-100">
            <View className="p-5 gap-y-5 mb-[100px]">
                <Text className="text-base-content font-Afacad font-bold text-3xl mb-4">
                    Perfil de {user.user_name}
                </Text>

                {/* Info actual */}
                <View className="mb-4 bg-base-200 border border-base-300 rounded-lg p-4">
                    <Text className="text-base-content font-Afacad font-bold text-lg mb-1">
                        Datos actuales
                    </Text>
                    <View className="rounded-full overflow-hidden w-20 h-20 flex items-center justify-center border-4 border-base-100">
                        <Image
                            source={require("../../../assets/images/user-profile.jpg")}
                            style={{ width: "150%", height: "150%", resizeMode: "cover" }}
                        />
                    </View>
                    <Text className="text-base-content font-Afacad font-bold text-xl">
                        {user.user_name} {user.user_lastname}
                    </Text>
                    <Text className="text-base-content/80 font-Afacad">{user.user_email}</Text>
                    <Text className="text-base-content font-Afacad  bg-base-100 w-fit px-2 py-1 rounded-lg mt-2">
                        {user.role.role_name}
                    </Text>
                </View>

                <View className="bg-base-200 border border-base-300 rounded-lg p-5 shadow-lg shadow-base-300">
                    {/* Formulario con Formik */}
                    <Formik
                        initialValues={{
                            user_name: user.user_name,
                            user_lastname: user.user_lastname,
                            user_email: user.user_email,
                            user_password: "",
                        }}
                        onSubmit={handleUpdate}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <View className="gap-y-4">
                                <Text className="text-base-content font-Otomanopee font-bold text-xl">
                                    Actualizar perfil
                                </Text>
                                <View>
                                    <Text className="text-base-content/80 font-Afacad font-medium">
                                        Nombre:
                                    </Text>
                                    <TextInput
                                        className="border border-base-300 placeholder:text-base-content/80 text-base-content p-2 rounded-sm focus:outline-none focus:border-primary"
                                        onChangeText={handleChange("user_name")}
                                        value={values.user_name}
                                        placeholder="Nombre"
                                    />
                                </View>

                                <View>
                                    <Text className="text-base-content/80 font-Afacad font-medium">
                                        Apellido:
                                    </Text>
                                    <TextInput
                                        className="border border-base-300 placeholder:text-base-content/80 text-base-content p-2 rounded-sm focus:outline-none focus:border-primary"
                                        onChangeText={handleChange("user_lastname")}
                                        value={values.user_lastname}
                                        placeholder="Apellido"
                                    />
                                </View>

                                <View>
                                    <Text className="text-base-content/80 font-Afacad font-medium">
                                        Correo:
                                    </Text>
                                    <TextInput
                                        className="border border-base-300 placeholder:text-base-content/80 text-base-content p-2 rounded-sm focus:outline-none focus:border-primary"
                                        onChangeText={handleChange("user_email")}
                                        value={values.user_email}
                                        placeholder="Correo electrónico"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View>
                                    <Text className="text-base-content/80 font-Afacad font-medium">
                                        Contraseña:
                                    </Text>
                                    <TextInput
                                        className="border border-base-300 placeholder:text-base-content/80 text-base-content p-2 rounded-sm focus:outline-none focus:border-primary"
                                        onChangeText={handleChange("user_password")}
                                        value={values.user_password}
                                        placeholder="Nueva contraseña"
                                        secureTextEntry
                                    />
                                </View>

                                <Pressable
                                    onPress={handleSubmit}
                                    className="bg-primary rounded p-2"
                                >
                                    <Text className="text-base-content font-Afacad text-center font-medium">
                                        Actualizar perfil
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </ScrollView>
    );
}
