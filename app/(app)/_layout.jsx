import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/authContext";

export default function RootLayout() {
    const { data: user } = useAuth();

    if (!user) {
        return <Redirect href="/" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ headerShown: true }} />
        </Stack>
    );
}
