
interface SwappyBooksResponse{
    successful:boolean;
    message:string;
    username:string;
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

export interface SwappyBooksResponse {
  successful: boolean;
  message: string;
  username: string;
  data?: any;  // Opzionale per quando ci sono dati aggiuntivi
}
