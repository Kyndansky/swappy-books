// src/components/book/bookInfo.tsx
import React from 'react';
import { Chip } from "@heroui/react";
import { BookDetail } from '@/types/interfaces';

interface BookInfoProps {
  book: BookDetail;
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  // Mappa per le condizioni (uguale a BookCard)
  const conditionLabels = {
    'new': 'Nuovo',
    'like-new': 'Come nuovo',
    'good': 'Buono',
    'acceptable': 'Accettabile'
  };

  // Colori diversi per ogni condizione
  const conditionColors = {
    'new': 'success',
    'like-new': 'primary',
    'good': 'warning',
    'acceptable': 'danger'
  };

  return (
    <div className="space-y-4">
      {/* Titolo e autore */}
      <div>
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-xl text-default-500 mt-1">{book.author}</p>
      </div>

      {/* Venditore con rating (versione compatta) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-default-600">Venditore:</span>
          <span className="font-medium">{book.sellerInfo.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-small">{book.sellerInfo.rating}</span>
          <span className="text-tiny text-default-400">
            ({book.sellerInfo.totalReviews} recensioni)
          </span>
        </div>
      </div>

      {/* Prezzo e condizione */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-primary">
          €{book.price}
        </span>
        <Chip 
          color={conditionColors[book.condition] as any}
          variant="flat"
          size="lg"
        >
          {conditionLabels[book.condition]}
        </Chip>
      </div>

      {/* Disponibilità */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success" />
        <span className="text-success">Disponibile</span>
      </div>
    </div>
  );
};

export default BookInfo;
