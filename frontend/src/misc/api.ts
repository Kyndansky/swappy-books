import {
  SwappyBooksMessagesResponse,
  SwappyBooksProfileResponse,
  SwappyBooksSendMessageResponse,
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

//calls getSwaps to retrieve personal swaps and returns the result
export async function fetchPersonalSwaps(searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  return await fetchSwaps("getPersonalSwaps", searchString, minPrice, maxPrice, conditions, type);
}

//calls getSwaps to retrieve shop swaps and returns the result
export async function fetchShopSwaps(searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  return await fetchSwaps("getSwaps", searchString, minPrice, maxPrice, conditions, type);

}
//calls getSwaps to retrieve favorite swaps and returns the result
export async function fetchFavoriteSwaps(searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  return await fetchSwaps("getFavoriteSwaps", searchString, minPrice, maxPrice, conditions, type);
}

//retrieves swaps from the backend and returns them as a SwappyBooksSwapsResponse
export async function fetchSwaps(endpoint: "getSwaps" | "getPersonalSwaps" | "getFavoriteSwaps", searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  try {
    const response = await apiSwaps.post(endpoint+".php", {
      search: searchString,
      min_price: minPrice,
      max_price: maxPrice,
      conditions: conditions,
      type: type
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = response.data;
    const result: SwappyBooksSwapsResponse = {
      successful: data["successful"],
      message: data["message"],
      swaps: data["swaps"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksSwapsResponse = {
      successful: false,
      message: "error in "+endpoint+".php", //todo: change error when project is finished
      swaps: [],
    };
    return result;
  }
}

export async function sendMessage(
  content: string,
  chat: UserChatInfo,
): Promise<SwappyBooksSendMessageResponse> {
  try {
    const response = await apiChats.get("sendMessage.php", {
      params: {
        content: content,
        receiver: chat.username,
        swapId: chat.swapId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksSendMessageResponse = {
      successful: data["successful"],
      message: data["message"],
      sentMessage: data["sentMessage"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksSendMessageResponse = {
      successful: false,
      message: "server error",
    };
    return result;
  }
}
