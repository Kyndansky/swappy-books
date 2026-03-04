import { SwappyBooksResponse } from "@/types/interfaces";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const api=axios.create({baseURL:BACKEND_API_URL});
const apiAuth=axios.create({baseURL:BACKEND_API_URL});
export async function getAuthenticationInfo():Promise<SwappyBooksResponse>{
    
    const response:SwappyBooksResponse={
        successful:false,
        message:"Successfully logged in",
    };
    return response;
}