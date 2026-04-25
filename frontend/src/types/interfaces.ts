//base backend api response interface to encapsulate and standardize backend responses
export interface SwappyBooksResponse {
  successful: boolean;
  message: string;
}

//inherits base backend response and contains info about a user current authentication info
export interface SwappyBooksProfileResponse extends SwappyBooksResponse {
  username: string;
}

//contains info about a book that is being sold/has already been sold
export interface Swap {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  isbn?: string;
  condition: 'new' | 'like-new' | 'good' | 'acceptable' | 'damaged';
  type: "academic" | "fiction";
  seller: string;
  createdAtDate: string;
  favorite?:boolean;
  sellDate:string;
}

//inherits base backend response and contains info about swaps (either being sold, in the personal swaps of a user, or in favorites, etc..)
export interface SwappyBooksSwapsResponse extends SwappyBooksResponse {
  swaps: Swap[]
}

export interface SwappyBooksSwapResponse extends SwappyBooksResponse {
  swap?: Swap
}

//inherits base backend response and contains all the chats a user has ever involved themselves in
export interface SwappyBooksUserChatsResponse extends SwappyBooksResponse {
  chats: UserChatInfo[];
}

//inherits base backend response and contains all messages of a chat between the user and another user regarding a specific swap
export interface SwappyBooksMessagesResponse extends SwappyBooksResponse {
  messages: Message[];
}

//inherits base backend response and is used to return the message an user has sent to confirm the fact that it was sent
export interface SwappyBooksSendMessageResponse extends SwappyBooksResponse {
  sentMessage?: Message;
}

//contains information about a chat with another user
export interface UserChatInfo {
  username: string;
  swapId: number;
  swapBookTitle: string;
}

//contains information about a message, such as the time it was sent, its content etc...
export interface Message {
  content: string;
  sender: string;
  swapId: number;
  receiver: string;
  messageTime: string;
}

export interface BookImage {
  id: number;
  image_type?: string;
  is_primary: boolean;
  created_at?: string;
  data?: string;
}

export interface Swap {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  isbn?: string;
  condition: 'new' | 'like-new' | 'good' | 'acceptable' | 'damaged';
  type: "academic" | "fiction";
  seller: string;
  createdAtDate: string;
  favorite?:boolean;
  sellDate:string;
  images?: BookImage[];
  primaryImageId?: number | null;
  primaryImageData?: string | null;
  primaryImageType?: string | null;
}

export interface BookDetail extends Swap {
  images: BookImage[];
  isbn?: string;
  pages?: number;
  year?: number;
  language?: string;
  category: string;
  sellerInfo: {
    id: number;
    name: string;
    avatar?: string;
    memberSince: string;
    rating: number;
    totalReviews: number;
    activeListings: number;
  };
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}