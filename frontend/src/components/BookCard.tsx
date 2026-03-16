// src/components/BookCard.tsx
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Avatar } from "@heroui/react";
import { Heart, Eye } from "lucide-react";
import { Book } from '@/types/interfaces';

interface BookCardProps {
  book: Book;
  sellerName?: string;
  sellerAvatar?: string;
  isListView?: boolean;  // Nuova prop per distinguere la vista
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
  sellerAvatar,
  isListView = false  // Default a false (vista griglia)
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 50);
  
  const truncatedDescription = book.description.length > (isListView ? 200 : 80) 
    ? book.description.substring(0, isListView ? 200 : 80) + '...' 
    : book.description;

  const timeAgo = formatTimeAgo(book.createdAt);
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  // Se è vista lista, layout orizzontale
  if (isListView) {
    return (
      <Card className="w-full hover:scale-[1.02] transition-transform">
        <div className="flex flex-row">
          {/* Immagine a sinistra - dimensioni fisse quadrate */}
          <div className="w-[180px] h-[180px] flex-shrink-0">
            <Image
              alt={book.title}
              className="w-full h-full object-cover"
              src={book.coverImage || 'https://via.placeholder.com/180x180?text=Libro'}
              radius="none"
            />
          </div>

          {/* Contenuto a destra - prende tutto lo spazio rimanente */}
          <div className="flex-1 p-4">
            {/* Riga superiore con titolo e cuore */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-default-500">{book.author}</p>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => setIsLiked(!isLiked)}
              >
                <Heart 
                  size={20} 
                  className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </Button>
            </div>

            {/* Descrizione più lunga nella vista lista */}
            <p className="text-default-500 my-3 line-clamp-2">
              {truncatedDescription}
            </p>

            {/* Info venditore e metadata in riga */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                {/* Avatar e nome venditore */}
                <div className="flex items-center gap-2">
                  <Avatar 
                    src={sellerAvatar || `https://i.pravatar.cc/150?u=${book.seller}`} 
                    size="sm"
                  />
                  <span className="text-small text-default-600">{sellerName}</span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-small text-default-500">{rating}</span>
                </div>

                {/* Visualizzazioni e data */}
                <div className="flex items-center gap-2 text-default-400">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span className="text-tiny">{views}</span>
                  </div>
                  <span>•</span>
                  <span className="text-tiny">{timeAgo}</span>
                </div>
              </div>

              {/* Prezzo e condizione */}
              <div className="flex items-center gap-3">
                <span className="text-primary font-bold text-xl">€{book.price}</span>
                <span className="text-tiny text-default-400 bg-default-100 px-3 py-1 rounded-full">
                  {book.condition === 'new' && 'Nuovo'}
                  {book.condition === 'like-new' && 'Come nuovo'}
                  {book.condition === 'good' && 'Buono'}
                  {book.condition === 'acceptable' && 'Accettabile'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Vista griglia (quella originale)
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
          {!isListView && book.description.length > 80 && (
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

/*
================================================================================
PROPOSTE DI MIGLIORAMENTO
================================================================================

1. TIPI E INTERFACCE
   - Spostare BookCardProps in un file separato (es. types/components.ts)
   - Aggiungere validazione con Zod per il tipo Book

2. STATO E LOGICA
   - views e rating sono hardcoded come random: dovrebbero venire dal backend
   - Considerare useMemo per computed values (truncatedDescription, timeAgo, rating)
   - Il like non persiste: servirebbe chiamata API

3. PERFORMANCE
   - Aggiungere lazy loading per le immagini con loading="lazy"
   - Memoizzare il componente con React.memo per evitare re-render inutili
   - Considerare skeleton loading state

4. ACCESSIBILITÀ
   - Button like dovrebbe avere aria-label per screen readers
   - Immagini mancano di alt text descrittivo (già presente ma migliorabile)
   - Aggiungere role="article" per la card

5. UX
   - Toast/feedback visivo quando si clicca like
   - Click sulla card dovrebbe navigare ai dettagli del libro
   - Prezzo dovrebbe essere formattato (es. €9,90 invece di €9.9)
   - Considerare skeleton quando i dati sono in loading

6. CODE STYLE
   - Estrarre i badge (condizione, rating) in componenti separati
   - CreareCostanti per le stringhe hardcoded ("Venditore", placeholder URL)
   - Unificare la logica di visualizzazione condizione (-duplicate in entrambe le viste)

7. TEST
   - Aggiungere test unitari per formatTimeAgo
   - Testare entrambe le viste (isListView true/false)
   - Testare il comportamento del like button
*/

