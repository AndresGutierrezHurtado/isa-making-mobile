import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/authContext";

export default function RootLayout() {
    const { data: user } = useAuth();

    if (!user) {
        return <Redirect href="/" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
