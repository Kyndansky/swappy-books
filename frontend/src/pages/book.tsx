// src/pages/book.tsx
/**
 * book.tsx - Pagina dettaglio libro
 * 
 * COSA FA: Assembla tutti i componenti del libro in un'unica pagina:
 * - Layout a 2 colonne (carosello a sinistra, info/dx)
 * - Sezione venditore e recensioni
 * - Altri libri del venditore
 * - Gestione caricamento e errori
 * 
 * ROUTING: Dovrebbe essere accessibile via /book/:id
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Divider } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import { BookDetail, Review } from '@/types/interfaces';

// Import componenti
import BookCarousel from '@/components/book/bookCarousel';
import BookInfo from '@/components/book/bookInfo';
import BookActions from '@/components/book/bookActions';
import BookDescription from '@/components/book/bookDescription';
import BookSellerCard from '@/components/book/bookSellerCard';
import BookReviews from '@/components/book/bookReviews';
import BookSellerBooks from '@/components/book/bookSellerBooks';

// DATI MOCK (quando il backend è pronto, li sostituiremo con chiamate API)
const mockGetBookById = async (id: number): Promise<BookDetail> => {
  // Simuliamo un ritardo di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: id,
    title: "Il Nome della Rosa",
    author: "Umberto Eco",
    description: "L'anno è 1327. Guglielmo da Baskerville, francescano ed ex inquisitore, e il giovane novizio Adso da Melk arrivano a un'abbazia benedettina dell'Italia settentrionale per partecipare a un importante concilio teologico. Ma ben presto la loro missione si trasforma in un'inchiesta quando una serie di misteriose morti sconvolge la comunità monastica. Tra biblioteche labirintiche, manoscritti avvelenati e segreti eretici, i due si trovano immersi in un giallo medievale che anticipa di secoli il moderno romanzo poliziesco. Un capolavoro che intreccia sapientemente storia, filosofia, teologia e mistero.",
    price: 15.50,
    condition: "good",
    seller: 1,
    createdAt: "2024-01-01",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600", isPrimary: true },
      { id: 2, url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600", isPrimary: false },
      { id: 3, url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600", isPrimary: false }
    ],
    isbn: "978-88-452-7401-3",
    pages: 624,
    year: 1980,
    language: "Italiano",
    category: "Romanzo storico",
    sellerInfo: {
      id: 1,
      name: "Mario Librario",
      avatar: "https://i.pravatar.cc/150?u=1",
      memberSince: "2023-01-15",
      rating: 4.8,
      totalReviews: 127,
      activeListings: 8
    }
  };
};

const mockGetReviews = async (bookId: number): Promise<{ reviews: Review[]; averageRating: number; totalCount: number }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    reviews: [
      {
        id: 1,
        userId: 101,
        userName: "Laura Bianchi",
        userAvatar: "https://i.pravatar.cc/150?u=101",
        rating: 5,
        comment: "Libro meraviglioso! L'ho ricevuto in ottime condizioni, la spedizione è stata velocissima. Venditore super affidabile, lo consiglio!",
        date: "2025-03-10"
      },
      {
        id: 2,
        userId: 102,
        userName: "Giuseppe Verdi",
        userAvatar: "https://i.pravatar.cc/150?u=102",
        rating: 4,
        comment: "Bel libro, consegnato nei tempi previsti. La copertina aveva un piccolo segno ma nel complesso tutto ok.",
        date: "2025-03-05"
      },
      {
        id: 3,
        userId: 103,
        userName: "Sofia Rossi",
        userAvatar: "https://i.pravatar.cc/150?u=103",
        rating: 5,
        comment: "Un capolavoro assoluto. Il libro è arrivato in condizioni perfette, sembra nuovo. Grazie mille!",
        date: "2025-02-28"
      },
      {
        id: 4,
        userId: 104,
        userName: "Marco Neri",
        userAvatar: "https://i.pravatar.cc/150?u=104",
        rating: 4.5,
        comment: "Ottimo acquisto, rapporto qualità prezzo eccellente. Venditore gentile e disponibile.",
        date: "2025-02-20"
      }
    ],
    averageRating: 4.6,
    totalCount: 24
  };
};

const mockGetSellerOtherBooks = async (sellerId: number, currentBookId: number): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 10,
      title: "Il Pendolo di Foucault",
      author: "Umberto Eco",
      description: "Un'altra opera magistrale di Eco...",
      price: 18.00,
      condition: "good",
      seller: sellerId,
      createdAt: "2024-02-10",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200"
    },
    {
      id: 11,
      title: "L'Isola del Giorno Prima",
      author: "Umberto Eco",
      description: "...",
      price: 12.50,
      condition: "like-new",
      seller: sellerId,
      createdAt: "2024-01-20",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200"
    },
    {
      id: 12,
      title: "Baudolino",
      author: "Umberto Eco",
      description: "...",
      price: 14.00,
      condition: "acceptable",
      seller: sellerId,
      createdAt: "2024-03-01",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200"
    }
  ];
};

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookId = parseInt(id || '0');
  
  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviewsData, setReviewsData] = useState<{ reviews: Review[]; averageRating: number; totalCount: number } | null>(null);
  const [sellerBooks, setSellerBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!bookId) {
        setError("Libro non trovato");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Carica dati in parallelo per performance
        const [bookData, reviewsData, sellerBooksData] = await Promise.all([
          mockGetBookById(bookId),
          mockGetReviews(bookId),
          mockGetSellerOtherBooks(bookId === 1 ? 1 : bookData?.seller || 1, bookId)
        ]);
        
        setBook(bookData);
        setReviewsData(reviewsData);
        setSellerBooks(sellerBooksData);
      } catch (err) {
        console.error("Errore caricamento dati:", err);
        setError("Impossibile caricare i dettagli del libro. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [bookId]);

  // Gestione stato di caricamento
  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" label="Caricamento libro..." />
        </div>
      </DefaultLayout>
    );
  }

  // Gestione errore
  if (error || !book) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-danger text-lg">{error || "Libro non trovato"}</p>
          <Button color="primary" onPress={() => navigate('/')}>
            Torna alla home
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Barra di navigazione superiore */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate('/')}
            aria-label="Torna indietro"
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="text-default-500 text-sm">
            / Dettaglio libro
          </span>
        </div>

        {/* Layout principale a 2 colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Colonna sinistra: Carosello */}
          <div>
            <BookCarousel 
              images={book.images || []} 
              title={book.title}
            />
          </div>
          
          {/* Colonna destra: Info e azioni */}
          <div className="space-y-6">
            <BookInfo book={book} />
            <BookActions 
              bookId={book.id}
              isLiked={isLiked}
              onLikeChange={setIsLiked}
            />
          </div>
        </div>

        {/* Descrizione */}
        <div className="mb-12">
          <BookDescription 
            description={book.description} 
            details={book}
          />
        </div>

        <Divider className="my-8" />

        {/* Sezione venditore e recensioni in griglia */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Colonna sinistra (1/3): Card venditore */}
          <div className="lg:col-span-1">
            <BookSellerCard seller={book.sellerInfo} />
          </div>
          
          {/* Colonna destra (2/3): Recensioni */}
          <div className="lg:col-span-2">
            {reviewsData && (
              <BookReviews 
                reviews={reviewsData.reviews}
                averageRating={reviewsData.averageRating}
                totalCount={reviewsData.totalCount}
                onShowAll={() => console.log('Vedi tutte le recensioni')}
              />
            )}
          </div>
        </div>

        {/* Altri libri del venditore */}
        {sellerBooks.length > 0 && (
          <>
            <Divider className="my-8" />
            <div className="mt-8">
              <BookSellerBooks 
                books={sellerBooks}
                sellerId={book.sellerInfo.id}
                sellerName={book.sellerInfo.name}
                onBookClick={(bookId) => navigate(`/book/${bookId}`)}
                onViewAll={() => console.log(`Vedi tutti gli annunci di ${book.sellerInfo.name}`)}
              />
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BookPage;
