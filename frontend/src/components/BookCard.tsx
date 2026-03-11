// src/components/BookCard.tsx
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Avatar } from "@heroui/react";
import { Heart, Eye } from "lucide-react";
import { Book } from '@/types/interfaces';

interface BookCardProps {
  book: Book;
  sellerName?: string;
  sellerAvatar?: string;
}

// Funzione per formattare data senza librerie esterne
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'pochi secondi fa';
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} ${mins === 1 ? 'minuto' : 'minuti'} fa`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'ora' : 'ore'} fa`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return `${days} ${days === 1 ? 'giorno' : 'giorni'} fa`;
};

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  sellerName = "Venditore", 
  sellerAvatar 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 50);
  
  const truncatedDescription = book.description.length > 80 
    ? book.description.substring(0, 80) + '...' 
    : book.description;

  const timeAgo = formatTimeAgo(book.createdAt);
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  return (
    <Card className="w-full max-w-[280px] hover:scale-105 transition-transform">
      <CardBody className="overflow-visible p-0 relative">
        <Image
          alt={book.title}
          className="w-full object-cover h-[180px]"
          src={book.coverImage || 'https://via.placeholder.com/280x180?text=Libro'}
        />
        
        <Button
          isIconOnly
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
          size="sm"
          variant="flat"
          onPress={() => setIsLiked(!isLiked)}
        >
          <Heart 
            size={18} 
            className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </Button>
      </CardBody>
      
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="w-full">
          <h3 className="text-lg font-bold line-clamp-1">{book.title}</h3>
          <p className="text-small text-default-500">{book.author}</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar 
              src={sellerAvatar || `https://i.pravatar.cc/150?u=${book.seller}`} 
              size="sm"
              className="min-w-[24px]"
            />
            <span className="text-small text-default-600">{sellerName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-small text-yellow-500">★</span>
            <span className="text-tiny text-default-500">{rating}</span>
          </div>
        </div>

        <p className="text-small text-default-500 line-clamp-2 relative">
          {truncatedDescription}
          {book.description.length > 80 && (
            <span className="absolute bottom-0 right-0 bg-gradient-to-l from-white dark:from-black to-transparent pl-2">
              {' '}
            </span>
          )}
        </p>

        <div className="flex items-center gap-3 text-tiny text-default-400">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{views}</span>
          </div>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>

        <div className="flex w-full justify-between items-center mt-1">
          <span className="text-primary font-bold text-lg">€{book.price}</span>
          <span className="text-tiny text-default-400 bg-default-100 px-2 py-1 rounded-full">
            {book.condition === 'new' && 'Nuovo'}
            {book.condition === 'like-new' && 'Come nuovo'}
            {book.condition === 'good' && 'Buono'}
            {book.condition === 'acceptable' && 'Accettabile'}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
