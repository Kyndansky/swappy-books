// src/components/BookCard.tsx
import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Book } from '@/types/interfaces';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const truncatedDescription = book.description.length > 80 
    ? book.description.substring(0, 80) + '...' 
    : book.description;

  return (
    <Card className="w-full max-w-[280px] hover:scale-105 transition-transform">
      <CardBody className="overflow-visible p-0">
        <Image
          alt={book.title}
          className="w-full object-cover h-[180px]"
          src={book.coverImage || 'https://via.placeholder.com/280x180?text=Libro'}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-bold line-clamp-1">{book.title}</h3>
        <p className="text-small text-default-500 line-clamp-2 relative">
          {truncatedDescription}
          {book.description.length > 80 && (
            <span className="absolute bottom-0 right-0 bg-gradient-to-l from-white dark:from-black to-transparent pl-2">
              {' '}
            </span>
          )}
        </p>
        <div className="flex w-full justify-between items-center mt-2">
          <span className="text-primary font-bold">€{book.price}</span>
          <span className="text-tiny text-default-400">
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
