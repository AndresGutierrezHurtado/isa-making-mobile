import "../assets/global.css";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import AppLoading from "../components/loading";
import { AuthProvider } from "../contexts/authContext";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Afacad: require("../assets/fonts/Afacad-Regular.ttf"),
        Otomanopee: require("../assets/fonts/OtomanopeeOne-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
            </Stack>
        </AuthProvider>
    );
}
