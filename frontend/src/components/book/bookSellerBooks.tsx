// src/components/book/bookSellerBooks.tsx
/**
 * bookSellerBooks.tsx
 * 
 * COSA FA: Mostra una lista orizzontale (carosello) di altri libri pubblicati dallo stesso venditore:
 * - Slider scorrevole con frecce
 * - Mini-card dei libri (versione ridotta di BookCard)
 * - Link "Vedi tutti" per vedere tutti gli annunci del venditore
 * 
 * COME SI USA: <BookSellerBooks books={otherBooks} sellerId={123} onViewAll={() => ...} />
 */

import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, Image } from "@heroui/react";
import { ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Book } from '@/types/interfaces';

interface bookSellerBooksProps {
  books: Book[];                // Array di libri del venditore (escluso quello corrente)
  sellerId: number;             // ID del venditore (per link "Vedi tutti")
  sellerName?: string;          // Nome venditore (opzionale, per il titolo)
  onBookClick?: (bookId: number) => void;  // Quando clicca un libro
  onViewAll?: () => void;       // Quando clicca "Vedi tutti"
}

const BookSellerBooks: React.FC<bookSellerBooksProps> = ({ 
  books, 
  sellerId,
  sellerName = "questo venditore",
  onBookClick,
  onViewAll 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Se non ci sono altri libri, non mostrare nulla
  if (!books || books.length === 0) {
    return null;
  }

  // Funzioni per lo scroll
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header con titolo e link "Vedi tutti" */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          📚 Altri libri di {sellerName}
        </h2>
        {onViewAll && (
          <Button
            variant="light"
            size="sm"
            endContent={<ChevronRightIcon size={16} />}
            onPress={onViewAll}
          >
            Vedi tutti
          </Button>
        )}
      </div>

      {/* Contenitore slider con frecce */}
      <div className="relative group">
        {/* Frecce di navigazione (visibili solo se necessario) */}
        {showLeftArrow && (
          <Button
            isIconOnly
            variant="flat"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md"
            onPress={() => scroll('left')}
            aria-label="Libri precedenti"
          >
            <ChevronLeft size={20} />
          </Button>
        )}
        
        {showRightArrow && (
          <Button
            isIconOnly
            variant="flat"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md"
            onPress={() => scroll('right')}
            aria-label="Libri successivi"
          >
            <ChevronRight size={20} />
          </Button>
        )}

        {/* Container scrollabile */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <Card
              key={book.id}
              isPressable
              className="min-w-[160px] max-w-[160px]"
              onPress={() => onBookClick?.(book.id)}
            >
              <CardBody className="p-0">
                {/* Immagine mini */}
                <Image
                  alt={book.title}
                  className="w-full object-cover h-[120px]"
                  src={book.coverImage || 'https://via.placeholder.com/160x120?text=Libro'}
                  radius="none"
                />
                
                {/* Info minime */}
                <div className="p-2 space-y-1">
                  <h3 className="text-small font-semibold line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-tiny text-default-500 line-clamp-1">
                    {book.author}
                  </p>
                  <p className="text-primary font-bold text-small">
                    €{book.price}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSellerBooks;
