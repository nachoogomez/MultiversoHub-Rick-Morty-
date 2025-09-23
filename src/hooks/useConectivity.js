import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";

export const useConectivity = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { isConnected, isLoading };
}