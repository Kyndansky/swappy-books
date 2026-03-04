// src/pages/index.tsx
import React, { useState } from 'react';
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/interfaces";

// Dati esempio con seller (invece di sellerId)
const sampleBooks: Book[] = [
  {
    id: 1,
    title: "Il Nome della Rosa",
    author: "Umberto Eco",
    description: "Un monastero benedettino nell'Italia del XIV secolo, dove si susseguono misteriose morti. Il frate francescano Guglielmo da Baskerville indaga...",
    price: 15.50,
    condition: "good",
    seller: 1,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Un classico della programmazione che insegna le migliori pratiche per scrivere codice pulito e manutenibile.",
    price: 45.00,
    condition: "like-new",
    seller: 2,
    createdAt: "2024-02-01"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "Il capolavoro distopico che descrive un futuro totalitario dove il Grande Fratello controlla ogni aspetto della vita.",
    price: 12.00,
    condition: "acceptable",
    seller: 3,
    createdAt: "2024-01-15"
  },
  {
    id: 4,
    title: "Il Piccolo Principe",
    author: "Antoine de Saint-Exupéry",
    description: "Un racconto poetico e filosofico sotto forma di favola per bambini, ma ricco di significati profondi per adulti.",
    price: 8.50,
    condition: "new",
    seller: 4,
    createdAt: "2024-03-01"
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    description: "Sul pianeta desertico Arrakis, il giovane Paul Atreides si trova al centro di una complessa guerra per il controllo della spezia, la risorsa più preziosa dell'universo.",
    price: 22.00,
    condition: "good",
    seller: 5,
    createdAt: "2024-02-20"
  },
  {
    id: 6,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description: "In un futuro dove i libri sono proibiti, i pompieri non spengono incendi ma li appiccano per bruciare ogni volume. Un pompiere inizia a mettere in discussione il sistema.",
    price: 14.00,
    condition: "acceptable",
    seller: 6,
    createdAt: "2024-01-28"
  },
  {
    id: 7,
    title: "Cent'anni di solitudine",
    author: "Gabriel García Márquez",
    description: "La storia della famiglia Buendía attraverso sette generazioni nel villaggio immaginario di Macondo, tra realismo magico e eventi straordinari.",
    price: 18.50,
    condition: "good",
    seller: 7,
    createdAt: "2024-03-05"
  },
  {
    id: 8,
    title: "L'alchimista",
    author: "Paulo Coelho",
    description: "Un giovane pastore andaluso viaggia in cerca di un tesoro e scopre il vero significato della vita e dei propri sogni.",
    price: 11.00,
    condition: "like-new",
    seller: 8,
    createdAt: "2024-02-10"
  }
];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = sampleBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Barra di ricerca - sotto la navbar */}
        <div className="max-w-2xl mx-auto mb-8">
          <Input
            classNames={{
              base: "w-full",
              input: "text-medium",
              inputWrapper: "h-14 font-normal text-default-500 bg-default-100 dark:bg-default-50",
            }}
            placeholder="Cerca libri per titolo, autore o descrizione..."
            size="lg"
            startContent={<Search size={20} className="text-default-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            radius="lg"
          />
        </div>

        {/* Header con risultati */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Libri disponibili</h1>
          <p className="text-default-500">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'libro trovato' : 'libri trovati'}
          </p>
        </div>

        {/* Griglia card */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-default-500 text-lg">Nessun libro trovato per "{searchTerm}"</p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
