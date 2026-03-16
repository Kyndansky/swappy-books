import {
  SwappyBooksMessagesResponse,
  SwappyBooksProfileResponse,
  SwappyBooksSwapsResponse,
  SwappyBooksUserChatsResponse,
  UserChatInfo,
} from "@/types/interfaces";
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
//const api = axios.create({ baseURL: BACKEND_API_URL });
const apiAuth = axios.create({ baseURL: `${BACKEND_API_URL}/users/` });
const apiChats = axios.create({ baseURL: `${BACKEND_API_URL}/messages/` });
const apiSwaps = axios.create({ baseURL: `${BACKEND_API_URL}/swaps/` });

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
      username: data["username"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksProfileResponse = {
      successful: false,
      message: "server error",
      username: "",
    };
    return result;
  }
}

export async function register(
  username: string,
  password: string,
): Promise<SwappyBooksProfileResponse> {
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
      username: data["username"],
    };
    console.log(result.message);
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksProfileResponse = {
      successful: false,
      message: "server error",
      username: "",
    };
    return result;
  }
}

export async function login(
  username: string,
  password: string,
): Promise<SwappyBooksProfileResponse> {
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
      username: data["username"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksProfileResponse = {
      successful: false,
      message: "server error",
      username: "",
    };
    return result;
  }
}

export async function logout(): Promise<SwappyBooksProfileResponse> {
  try {
    const response = await apiAuth.get("logout.php", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksProfileResponse = {
      successful: data["successful"],
      message: data["message"],
      username: data["username"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksProfileResponse = {
      successful: false,
      message: "server error",
      username: "",
    };
    return result;
  }
}

export async function getUserChats(): Promise<SwappyBooksUserChatsResponse> {
  try {
    const response = await apiChats.get("getUserChats.php", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksUserChatsResponse = {
      successful: data["successful"],
      message: data["message"],
      chats: data["chats"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksUserChatsResponse = {
      successful: false,
      message: "server error",
      chats: [],
    };
    return result;
  }
}

export async function getChatMessages(
  chatInfo: UserChatInfo,
): Promise<SwappyBooksMessagesResponse> {
  try {
    const response = await apiChats.get("getchat.php", {
      params: {
        other_user: chatInfo.username,
        swapId: chatInfo.swapId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(response.data);
    const result: SwappyBooksMessagesResponse = {
      successful: data["successful"],
      message: data["message"],
      messages: [],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksMessagesResponse = {
      successful: false,
      message: "server error",
      messages: [],
    };
    return result;
  }
}

export async function getPersonalSwaps(): Promise<SwappyBooksSwapsResponse> {
  try {
    const response = await apiSwaps.get("getPersonalSwaps.php", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksSwapsResponse = {
      successful: data["successful"],
      message: data["message"],
      swaps: [],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksSwapsResponse = {
      successful: false,
      message: "server error",
      swaps: [],
    };
    return result;
  }
}


export async function getShopSwaps(): Promise<SwappyBooksSwapsResponse> {
  try {
    const response = await apiSwaps.get("getShopSwaps.php", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksSwapsResponse = {
      successful: data["successful"],
      message: data["message"],
      swaps: [],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksSwapsResponse = {
      successful: false,
      message: "server error",
      swaps: [],
    };
    return result;
  }
}