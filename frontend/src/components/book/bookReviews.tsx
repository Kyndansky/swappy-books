// src/components/book/bookReviews.tsx
/**
 * bookReviews.tsx
 * 
 * COSA FA: Mostra le recensioni degli utenti che hanno comprato il libro:
 * - Media delle recensioni con stelle
 * - Lista delle ultime recensioni (o tutte)
 * - Ogni recensione mostra: avatar, nome, stelle, commento, data
 * - Bottone per vedere tutte le recensioni
 * 
 * COME SI USA: <BookReviews reviews={reviews} averageRating={4.5} totalCount={23} />
 */

import React, { useState } from 'react';
import { Avatar, Button, Divider } from "@heroui/react";
import { Star, ChevronRight } from "lucide-react";
import { Review } from '@/types/interfaces';

interface bookReviewsProps {
  reviews: Review[];           // Lista recensioni (es. ultime 3)
  averageRating: number;       // Media stelle (es. 4.5)
  totalCount: number;          // Numero totale recensioni
  showAllLink?: boolean;       // Se mostrare link "Vedi tutte"
  onShowAll?: () => void;      // Funzione quando clicca "Vedi tutte"
  initialLimit?: number;       // Quante recensioni mostrare inizialmente (default 3)
}

const BookReviews: React.FC<bookReviewsProps> = ({ 
  reviews, 
  averageRating, 
  totalCount,
  showAllLink = true,
  onShowAll,
  initialLimit = 3
}) => {
  const [showAll, setShowAll] = useState(false);
  
  // Recensioni da mostrare (tutte o limitate)
  const displayedReviews = showAll ? reviews : reviews.slice(0, initialLimit);
  
  // Genera array di stelle piene/vuote
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-yellow-500" />
            <Star 
              size={14} 
              className="absolute top-0 left-0 fill-yellow-500 text-yellow-500 clip-half" 
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          </div>
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  // Formatta data (es. "2 giorni fa", "settimana scorsa")
  const formatReviewDate = (dateString: string) => {
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
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'giorno' : 'giorni'} fa`;
    }
    return date.toLocaleDateString('it-IT');
  };

  return (
    <div className="space-y-6">
      {/* Header con media recensioni */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold"> Recensioni</h2>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(averageRating)}
            </div>
            <span className="text-small font-medium ml-1">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
        <span className="text-small text-default-400">
          ({totalCount} {totalCount === 1 ? 'recensione' : 'recensioni'})
        </span>
      </div>

      <Divider />

      {/* Lista recensioni */}
      {displayedReviews.length > 0 ? (
        <div className="space-y-6">
          {displayedReviews.map((review, index) => (
            <React.Fragment key={review.id}>
              <div className="space-y-3">
                {/* Intestazione recensione: avatar, nome, stelle, data */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src={review.userAvatar || `https://i.pravatar.cc/150?u=${review.userId}`}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-tiny text-default-400">
                          {formatReviewDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testo recensione */}
                <p className="text-default-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
              
              {/* Separatore tra recensioni (tranne ultima) */}
              {index < displayedReviews.length - 1 && (
                <Divider className="my-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="text-default-400 text-center py-8">
          Nessuna recensione ancora. Acquista e lasciane una!
        </p>
      )}

      {/* Bottoni per vedere più recensioni */}
      {reviews.length > initialLimit && (
        <div className="flex justify-center">
          {!showAll ? (
            <Button
              variant="light"
              endContent={<ChevronRight size={16} />}
              onPress={() => setShowAll(true)}
            >
              Mostra altre {reviews.length - initialLimit} recensioni
            </Button>
          ) : (
            showAllLink && onShowAll && (
              <Button
                color="primary"
                variant="flat"
                endContent={<ChevronRight size={16} />}
                onPress={onShowAll}
              >
                Vedi tutte le recensioni
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default BookReviews;
