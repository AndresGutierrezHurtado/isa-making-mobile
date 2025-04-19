// utils/storage.js
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

export const storage = {
    getItem: async (key) => {
        if (isWeb) {
            return AsyncStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
    },

    setItem: async (key, value) => {
        if (isWeb) {
            return AsyncStorage.setItem(key, value);
        }
        return SecureStore.setItemAsync(key, value);
    },

    deleteItem: async (key) => {
        if (isWeb) {
            return AsyncStorage.removeItem(key);
        }
        return SecureStore.deleteItemAsync(key);
    },
};
