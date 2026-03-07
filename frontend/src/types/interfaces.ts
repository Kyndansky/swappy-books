
export interface SwappyBooksResponse{
    successful:boolean;
    message:string;
}

// src/types/interfaces.ts - AGGIUNGIAMO:
export interface Book {
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

export interface Swap{
    uploadDate:string;
    sellDate?:string;
    title:string;
    description:string;   
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