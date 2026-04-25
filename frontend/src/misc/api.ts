import { BookCondition } from "@/types/bookInfoTypes";
import {
  SwappyBooksMessagesResponse,
  SwappyBooksProfileResponse,
  SwappyBooksResponse,
  SwappyBooksSendMessageResponse,
  SwappyBooksSwapResponse,
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
    const response = await apiChats.get("getChat.php", {
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
      messages: data["messages"],
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
  return await fetchSwaps("getUserSwaps", searchString, minPrice, maxPrice, conditions, type);
}

//calls getSwaps to retrieve shop swaps and returns the result
export async function fetchShopSwaps(searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  return await fetchSwaps("getSwaps", searchString, minPrice, maxPrice, conditions, type);

}
//calls getSwaps to retrieve favorite swaps and returns the result
export async function fetchFavoriteSwaps(searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  return await fetchSwaps("getFavorite", searchString, minPrice, maxPrice, conditions, type);
}

//retrieves swaps from the backend and returns them as a SwappyBooksSwapsResponse
export async function fetchSwaps(endpoint: "getSwaps" | "getUserSwaps" | "getFavorite", searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fiction"): Promise<SwappyBooksSwapsResponse> {
  try {
    const response = await apiSwaps.post(endpoint + ".php", {
      searchString: searchString,
      minPrice: minPrice,
      maxPrice: maxPrice,
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
      message: "error in " + endpoint + ".php", //todo: change error when project is finished
      swaps: [],
    };
    return result;
  }
}

export async function fetchSwap(swapId: number): Promise<SwappyBooksSwapResponse> {
  try {
    const response = await apiSwaps.post("getSwapInfo.php", {
      swapId: swapId
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = response.data;
    const result: SwappyBooksSwapResponse = {
      successful: data["successful"],
      message: data["message"],
      swap: data["swap"],
    };
    return result;
  } catch (error) {
    console.log("error from php server:", error);
    const result: SwappyBooksSwapResponse = {
      successful: false,
      message: "error in getSwapInfo.php",
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


export async function createSwap
  (bookTitle: string, bookAuthor: string, bookDescription: string, bookCondition: BookCondition["key"], bookPrice: number, bookCategory: "academic" | "fiction", bookIsbn?: string
  ): Promise<SwappyBooksResponse & { bookId?: number }> {
  try {
    const response = await apiSwaps.post("createSwap.php", {
      title: bookTitle,
      description: bookDescription,
      condition: bookCondition,
      price: bookPrice,
      author: bookAuthor,
      type: bookCategory,
      isbn: bookIsbn

    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksResponse & { bookId?: number } = {
      successful: data["successful"],
      message: data["message"],
      bookId: data["bookId"],
    };
    return result;
  } catch (error) {
    console.log("error in create.php:", error);
    const result: SwappyBooksResponse & { bookId?: number } = {
      successful: false,
      message: "error in create.php",
    };
    return result;
  }
}

export async function swapToggleFavorite(swapId: number): Promise<SwappyBooksResponse> {
  try {
    const response = await apiSwaps.post("toggleFavorite.php", {
      swapId: swapId
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    const result: SwappyBooksResponse = {
      successful: data["successful"],
      message: data["message"],
    };
    return result;
  } catch (error) {
    console.log("error in create.php:", error);
    const result: SwappyBooksResponse = {
      successful: false,
      message: "error in create.php",
    };
    return result;
  }
}

export interface BookImageResponse {
  id: number;
  image_type: string;
  is_primary: boolean;
  created_at?: string;
}

export interface UploadImagesResponse extends SwappyBooksResponse {
  images?: { id: number; is_primary: boolean }[];
}

export async function uploadBookImages(
  bookId: number,
  files: File[],
  primaryIndex: number = 0
): Promise<UploadImagesResponse> {
  try {
    const formData = new FormData();
    formData.append("book_id", bookId.toString());
    formData.append("primary_index", primaryIndex.toString());
    files.forEach((file) => {
      formData.append("images[]", file);
    });

    const response = await apiSwaps.post("uploadImages.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;
    return {
      successful: data["successful"],
      message: data["message"],
      images: data["images"],
    };
  } catch (error) {
    console.log("error in uploadImages.php:", error);
    return {
      successful: false,
      message: "error uploading images",
    };
  }
}

export async function getBookImages(
  bookId: number
): Promise<{ successful: boolean; message: string; images: BookImageResponse[] }> {
  try {
    const response = await apiSwaps.get("getImages.php", {
      params: { book_id: bookId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return {
      successful: data["successful"],
      message: data["message"],
      images: data["images"] || [],
    };
  } catch (error) {
    console.log("error in getImages.php:", error);
    return {
      successful: false,
      message: "error fetching images",
      images: [],
    };
  }
}

export async function deleteBookImage(imageId: number): Promise<SwappyBooksResponse> {
  try {
    const response = await apiSwaps.get("deleteImage.php", {
      params: { image_id: imageId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return {
      successful: data["successful"],
      message: data["message"],
    };
  } catch (error) {
    console.log("error in deleteImage.php:", error);
    return {
      successful: false,
      message: "error deleting image",
    };
  }
}

export function getImageUrl(imageId: number): string {
  return `${BACKEND_API_URL}/swaps/getImageData.php?image_id=${imageId}`;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));