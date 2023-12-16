import { Backend, Endpoint } from "./constants";

export async function fetchFromApi(endpoint: Endpoint, body?: string, apiKey?: string) {
    let response: Response;
    try {
        let myHeaders: any = {
            "Content-Type": "application/json",
        };
        if (typeof apiKey !== "undefined") {
            myHeaders["X-Auth-Token"] = apiKey;
        }
        response = await fetch(Backend + endpoint.path, {
            method: endpoint.method,
            headers: myHeaders,
            body: body,
        })
    } catch (err) {
        return { "error": "Error talking to backend." };
    }
    return await response.json();
}