import { SwappyBooksProfileResponse } from "@/types/interfaces";
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
//const api = axios.create({ baseURL: BACKEND_API_URL });
const apiAuth = axios.create({ baseURL: `${BACKEND_API_URL}/users/` });


export async function getAuthenticationInfo(): Promise<SwappyBooksProfileResponse> {

    try {
        const response = await apiAuth.get("getAuthInfo.php", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data;

        const result: SwappyBooksProfileResponse = {
            successful: data["successful"],
            message: data["message"],
            username: data["username"]
        };
        return result;
    } catch (error) {
        console.log("error from php server:", error);
        const result: SwappyBooksProfileResponse = {
            successful: false,
            message: "server error",
            username: ""
        };
        return result;
    }
}


export async function register(username: string, password: string): Promise<SwappyBooksProfileResponse> {
    try {
        const credentials = { username: username, password: password };
        const response = await apiAuth.post("register.php", credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data;
        const result: SwappyBooksProfileResponse = {
            successful: data["successful"],
            message: data["message"],
            username: data["username"]
        };
        console.log(result.message);
        return result;
    } catch (error) {
        console.log("error from php server:", error);
        const result: SwappyBooksProfileResponse = {
            successful: false,
            message: "server error",
            username: ""
        };
        return result;
    }
}

export async function login(username: string, password: string): Promise<SwappyBooksProfileResponse> {
    try {
        const credentials = { username: username, password: password };
        const response = await apiAuth.post("login.php", credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data;

        const result: SwappyBooksProfileResponse = {
            successful: data["successful"],
            message: data["message"],
            username: data["username"]
        };
        return result;
    } catch (error) {
        console.log("error from php server:", error);
        const result: SwappyBooksProfileResponse = {
            successful: false,
            message: "server error",
            username: ""
        };
        return result;
    }
}