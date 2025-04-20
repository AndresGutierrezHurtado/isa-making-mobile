import { usePathname } from "expo-router";
import { useState, useEffect } from "react";

const fetchData = async (url, options) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_DOMAIN}/api${url}`, {
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            ...options,
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export function useGetData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(1);
    const path = usePathname();

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await fetchData(url);
                setData(response?.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataAsync();
    }, [url, trigger, path]);

    const reload = () => {
        setTrigger((prev) => prev + 1);
    };

    return { data, loading, reload };
}

export async function usePostData(endpoint, data) {
    const {
        success,
        message,
        data: responseData,
    } = await fetchData(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
    });

    alert(message);

    return { success, message, data: responseData };
}

export async function usePutData(endpoint, data) {
    const {
        success,
        message,
        data: responseData,
    } = await fetchData(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
    });

    alert(message);

    return { success, message, data: responseData };
}

export async function useDeleteData(endpoint) {
    const {
        success,
        message,
        data: responseData,
    } = await fetchData(endpoint, {
        method: "DELETE",
    });

    alert(message);

    return { success, message, data: responseData };
}
