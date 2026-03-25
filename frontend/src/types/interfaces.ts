
export interface SwappyBooksResponse{
    successful:boolean;
    message:string;
}

export interface SwappyBooksProfileResponse extends SwappyBooksResponse{
    username:string;
}

// src/types/interfaces.ts - AGGIUNGIAMO:
export interface Swap {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage?: string;
  condition: 'new' | 'like-new' | 'good' | 'acceptable';
  seller: number;
  createdAt: string;
}


export interface SwappyBooksSwapsResponse extends SwappyBooksResponse{
    swaps:Swap[]
}

export interface SwappyBooksUserChatsResponse extends SwappyBooksResponse{
    chats:UserChatInfo[];
}

export interface SwappyBooksMessagesResponse extends SwappyBooksResponse{
    messages:Message[];
}

export interface SwappyBooksSendMessageResponse extends SwappyBooksResponse{
  sentMessage?:Message;
}


export interface UserChatInfo{
    username:string;
    swapId:number;
    swapBookTitle:string;
}

export interface Message{
    content:string;
    sender:string;
    swapId:number;
    receiver:string;
    messageTime:string;
}

export interface BookImage {
  id: number;
  url: string;
  isPrimary: boolean;
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
