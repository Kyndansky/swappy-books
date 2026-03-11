// src/pages/index.tsx
import React, { useState } from 'react';
import { Input, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Search, Grid, List, ChevronDown } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/interfaces";

const categories = ["Tutti", "Romanzi", "Tecnici", "Universitari", "Classici", "Best seller"];

const conditions = [
  { key: 'all', label: 'Tutte le condizioni' },
  { key: 'new', label: 'Nuovo' },
  { key: 'like-new', label: 'Come nuovo' },
  { key: 'good', label: 'Buono' },
  { key: 'acceptable', label: 'Accettabile' }
];

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "Il Nome della Rosa",
    author: "Umberto Eco",
    description: "Un monastero benedettino nell'Italia del XIV secolo, dove si susseguono misteriose morti. Il frate francescano Guglielmo da Baskerville indaga...",
    price: 15.50,
    condition: "good",
    seller: 1,
    createdAt: "2025-03-01"
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Un classico della programmazione che insegna le migliori pratiche per scrivere codice pulito e manutenibile.",
    price: 45.00,
    condition: "like-new",
    seller: 2,
    createdAt: "2025-03-05"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "Il capolavoro distopico che descrive un futuro totalitario dove il Grande Fratello controlla ogni aspetto della vita.",
    price: 12.00,
    condition: "acceptable",
    seller: 3,
    createdAt: "2025-03-02"
  },
  {
    id: 4,
    title: "Il Piccolo Principe",
    author: "Antoine de Saint-Exupéry",
    description: "Un racconto poetico e filosofico sotto forma di favola per bambini, ma ricco di significati profondi per adulti.",
    price: 8.50,
    condition: "new",
    seller: 4,
    createdAt: "2025-03-07"
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    description: "Sul pianeta desertico Arrakis, il giovane Paul Atreides si trova al centro di una complessa guerra per il controllo della spezia.",
    price: 120.00,
    condition: "good",
    seller: 5,
    createdAt: "2025-03-03"
  },
  {
    id: 6,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description: "In un futuro dove i libri sono proibiti, i pompieri non spengono incendi ma li appiccano per bruciare ogni volume.",
    price: 14.00,
    condition: "acceptable",
    seller: 6,
    createdAt: "2025-03-04"
  },
  {
    id: 7,
    title: "Cent'anni di solitudine",
    author: "Gabriel García Márquez",
    description: "La storia della famiglia Buendía attraverso sette generazioni nel villaggio immaginario di Macondo.",
    price: 18.50,
    condition: "good",
    seller: 7,
    createdAt: "2025-03-06"
  },
  {
    id: 8,
    title: "L'alchimista",
    author: "Paulo Coelho",
    description: "Un giovane pastore andaluso viaggia in cerca di un tesoro e scopre il vero significato della vita.",
    price: 11.00,
    condition: "like-new",
    seller: 8,
    createdAt: "2025-03-05"
  }
];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCondition = selectedCondition === 'all' || book.condition === selectedCondition;
    
    return matchesSearch && matchesCondition;
  });

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Barra di ricerca */}
        <div className="max-w-2xl mx-auto mb-6">
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

        {/* Filtri e toggle */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Categorie rapide */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Chip
                key={cat}
                variant={selectedCategory === cat ? "solid" : "flat"}
                color="primary"
                className="cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </div>

          {/* Filtri e toggle in riga */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    endContent={<ChevronDown size={16} />}
                  >
                    {conditions.find(c => c.key === selectedCondition)?.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Condizioni"
                  onAction={(key) => setSelectedCondition(key as string)}
                >
                  {conditions.map((cond) => (
                    <DropdownItem key={cond.key}>{cond.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Button variant="flat" className="min-w-[100px]">
                Prezzo: €0 - €100
              </Button>
            </div>

            {/* Toggle griglia/lista */}
            <div className="flex gap-1">
              <Button
                isIconOnly
                variant={viewMode === 'grid' ? "solid" : "light"}
                onPress={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </Button>
              <Button
                isIconOnly
                variant={viewMode === 'list' ? "solid" : "light"}
                onPress={() => setViewMode('list')}
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Header risultati */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Libri disponibili</h1>
          <p className="text-default-500">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'libro trovato' : 'libri trovati'}
          </p>
        </div>

        {/* Griglia/Lista libri */}
        {filteredBooks.length > 0 ? (
  <div className={
    viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
      : "flex flex-col gap-4"
  }>
    {filteredBooks.map((book) => (
      <div key={book.id} className={viewMode === 'list' ? "w-full" : ""}>
        <BookCard 
          book={book} 
          sellerName={`Venditore ${book.seller}`}
          isListView={viewMode === 'list'}
        />
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <p className="text-default-500 text-lg">Nessun libro trovato per "{searchTerm}"</p>
  </div>
)}      </div>
    </DefaultLayout>
  );
}

//test 
