import { Tabs } from "expo-router";
import Icon from "../../../components/icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "#27272a",
                    borderWidth: 1,
                    borderColor: "#3f3f46",
                    borderRadius: 10,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 60,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    flexDirection: "column",
                },
                tabBarIconStyle: {
                    marginBottom: -2,
                },
                tabBarActiveTintColor: "#3b82f6",
                tabBarInactiveTintColor: "#fafafa",
                tabBarLabelStyle: {
                    fontFamily: "Afacad",
                    fontSize: 15,
                    fontWeight: "normal",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Pedidos",
                    tabBarIcon: ({ color, size }) => <Icon name="shopping-bag" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Carrito",
                    tabBarIcon: ({ color, size }) => <Icon name="shopping-cart" color={color} size={20} />,
                }}
            />
        </Tabs>
    );
}
