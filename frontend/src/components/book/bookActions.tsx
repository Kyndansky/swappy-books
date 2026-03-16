// src/components/book/bookActions.tsx
/**
 * bookActions.tsx
 * 
 * COSA FA: Mostra tutti i bottoni e le azioni che l'utente può fare sul libro:
 * - Bottone "Contatta venditore" (messaggio)
 * - Bottone "Aggiungi al carrello" (o "Compra ora")
 * - Icona cuore per preferiti (con stato)
 * - Icona condividi
 * 
 * COME SI USA: <BookActions bookId={id} isLiked={false} onLikeChange={...} />
 */

import React, { useState } from 'react';
import { Button } from "@heroui/button";
import { Heart, Share2, MessageCircle, ShoppingCart } from "lucide-react";

interface bookActionsProps {
  bookId: number;
  isLiked?: boolean;
  onLikeChange?: (newState: boolean) => void;
}

const BookActions: React.FC<bookActionsProps> = ({ 
  bookId, 
  isLiked = false, 
  onLikeChange 
}) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    const newState = !liked;
    setLiked(newState);
    if (onLikeChange) {
      onLikeChange(newState);
    }
  };

  const handleShare = () => {
    // Copia link negli appunti
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // Qui potremmo mostrare un toast di conferma
    alert('Link copiato negli appunti!');
  };

  const handleContact = () => {
    // Qui andrà la logica per contattare il venditore
    console.log('Contatta venditore per libro', bookId);
  };

  const handleCart = () => {
    // Qui andrà la logica per aggiungere al carrello
    console.log('Aggiungi al carrello', bookId);
  };

  return (
    <div className="space-y-4">
      {/* Bottoni principali */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          color="primary"
          size="lg"
          startContent={<MessageCircle size={20} />}
          className="flex-1"
          onPress={handleContact}
        >
          Contatta venditore
        </Button>
        
        <Button
          color="secondary"
          size="lg"
          startContent={<ShoppingCart size={20} />}
          className="flex-1"
          onPress={handleCart}
        >
          Aggiungi al carrello
        </Button>
      </div>

      {/* Icone secondarie */}
      <div className="flex justify-end gap-2">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={handleLike}
          aria-label={liked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <Heart 
            size={24} 
            className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </Button>

        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={handleShare}
          aria-label="Condividi"
        >
          <Share2 size={24} className="text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default BookActions;
