import { Redirect, Stack } from "expo-router";
import { AuthProvider, useAuth } from "../../contexts/authContext";

export default function RootLayout() {
    const { data: user } = useAuth();

    if (user) {
        return <Redirect href="/home" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
