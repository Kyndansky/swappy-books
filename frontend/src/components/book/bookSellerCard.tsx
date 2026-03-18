// src/components/book/bookSellerCard.tsx
/**
 * bookSellerCard.tsx
 * 
 * COSA FA: Mostra le informazioni del venditore in una card evidenziata:
 * - Avatar e nome venditore
 * - Data iscrizione
 * - Rating con stelle e numero recensioni
 * - Numero annunci attivi
 * - Bottone per vedere tutti gli annunci del venditore
 * 
 * COME SI USA: <BookSellerCard seller={book.sellerInfo} />
 */

import React from 'react';
import { Card, CardBody, Avatar, Button, Divider } from "@heroui/react";
import { Star, Package } from "lucide-react";

interface bookSellerCardProps {
  seller: {
    id: number;
    name: string;
    avatar?: string;
    memberSince: string;
    rating: number;
    totalReviews: number;
    activeListings: number;
  };
}

const BookSellerCard: React.FC<bookSellerCardProps> = ({ seller }) => {
  // Formatta data iscrizione (es. "Marzo 2024")
  const formatMemberDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        {/* Header con avatar e nome */}
        <div className="flex items-center gap-4">
          <Avatar 
            src={seller.avatar || `https://i.pravatar.cc/150?u=${seller.id}`}
            className="w-16 h-16 text-large"
          />
          <div>
            <h3 className="text-xl font-semibold">{seller.name}</h3>
            <p className="text-small text-default-500">
              Membro da {formatMemberDate(seller.memberSince)}
            </p>
          </div>
        </div>

        <Divider className="my-4" />

        {/* Statistiche venditore */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Rating */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold text-default-700">
                {seller.rating}
              </span>
            </div>
            <p className="text-tiny text-default-400">
              {seller.totalReviews} recensioni
            </p>
          </div>

          {/* Annunci attivi */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-primary">
              <Package size={16} />
              <span className="font-semibold text-default-700">
                {seller.activeListings}
              </span>
            </div>
            <p className="text-tiny text-default-400">
              annunci attivi
            </p>
          </div>
        </div>

        {/* Bottone per tutti gli annunci */}
        <Button
          color="primary"
          variant="flat"
          className="w-full"
          onPress={() => {
            // Qui andrà la navigazione alla pagina degli annunci del venditore
            console.log('Vedi annunci di:', seller.id);
          }}
        >
          Vedi tutti gli annunci
        </Button>
      </CardBody>
    </Card>
  );
};

export default BookSellerCard;
