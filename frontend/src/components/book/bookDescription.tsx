// src/components/book/bookDescription.tsx
/**
 * bookDescription.tsx
 * 
 * COSA FA: Mostra la descrizione completa del libro e tutti i dettagli tecnici:
 * - Descrizione testuale
 * - Griglia con informazioni (categoria, ISBN, anno, pagine, lingua)
 * 
 * COME SI USA: <BookDescription description={book.description} details={book} />
 */

import React from 'react';
import { Divider } from "@heroui/react";
import { BookDetail } from '@/types/interfaces';

interface bookDescriptionProps {
  description: string;
  details: BookDetail;  // Contiene categoria, isbn, pagine, ecc.
}

const BookDescription: React.FC<bookDescriptionProps> = ({ description, details }) => {
  return (
    <div className="space-y-6">
      {/* Sezione Descrizione */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">📖 Descrizione</h2>
        <p className="text-default-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      <Divider />

      {/* Sezione Dettagli tecnici */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">📋 Dettagli</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Categoria */}
          <div className="space-y-1">
            <p className="text-tiny text-default-400 uppercase">Categoria</p>
            <p className="text-default-700 font-medium">{details.category}</p>
          </div>

          {/* ISBN (se presente) */}
          {details.isbn && (
            <div className="space-y-1">
              <p className="text-tiny text-default-400 uppercase">ISBN</p>
              <p className="text-default-700 font-medium font-mono">{details.isbn}</p>
            </div>
          )}

          {/* Anno (se presente) */}
          {details.year && (
            <div className="space-y-1">
              <p className="text-tiny text-default-400 uppercase">Anno</p>
              <p className="text-default-700 font-medium">{details.year}</p>
            </div>
          )}

          {/* Pagine (se presente) */}
          {details.pages && (
            <div className="space-y-1">
              <p className="text-tiny text-default-400 uppercase">Pagine</p>
              <p className="text-default-700 font-medium">{details.pages}</p>
            </div>
          )}

          {/* Lingua (se presente) */}
          {details.language && (
            <div className="space-y-1">
              <p className="text-tiny text-default-400 uppercase">Lingua</p>
              <p className="text-default-700 font-medium">{details.language}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
