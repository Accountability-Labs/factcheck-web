import { useState } from 'react';

export default function useApiKey() {
    const getApiKey = (): string => {
        const apiKey = localStorage.getItem("apiKey") || "";
        console.debug("Returning API key: " + apiKey);
        return apiKey;
    }
    const [apiKey, setApiKey] = useState(getApiKey());

    const saveApiKey = (apiKey: string) => {
        console.debug("Setting API key: " + apiKey);
        localStorage.setItem("apiKey", apiKey);
        setApiKey(apiKey);
    }

    return {
        setApiKey: saveApiKey,
        apiKey
    }
}