// src/components/book/bookCarousel.tsx
/**
 * bookCarousel.tsx
 * 
 * COSA FA: Galleria di immagini del libro con:
 * - Immagine principale grande
 * - Thumbnail (miniatura) sotto cliccabili per cambiare immagine
 * - Frecce per navigare tra le immagini
 * - Pallini di navigazione
 * - Click sull'immagine per aprirla a schermo intero (lightbox)
 * 
 * COME SI USA: <BookCarousel images={book.images} />
 */

import React, { useState } from 'react';
import { Image, Button, Modal, ModalContent } from "@heroui/react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { BookImage } from '@/types/interfaces';

interface bookCarouselProps {
  images: BookImage[];          // Array di immagini
  title?: string;               // Titolo libro per alt text
}

const BookCarousel: React.FC<bookCarouselProps> = ({ images, title = "Libro" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Se non ci sono immagini, mostra un placeholder
  const displayImages = images.length > 0 ? images : [
    { id: 0, url: 'https://via.placeholder.com/600x400?text=Nessuna+immagine', isPrimary: true }
  ];

  const currentImage = displayImages[currentIndex];

  // Navigazione tra immagini
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Apri lightbox con l'immagine corrente
  const openLightbox = () => {
    setLightboxIndex(currentIndex);
    setIsLightboxOpen(true);
  };

  // Navigazione nel lightbox
  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Carosello principale */}
      <div className="space-y-4">
        {/* Immagine principale con area cliccabile per zoom */}
        <div className="relative group">
          <div 
            className="relative overflow-hidden rounded-lg bg-default-100 cursor-zoom-in"
            onClick={openLightbox}
          >
            <Image
              alt={`${title} - immagine ${currentIndex + 1}`}
              className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-105"
              src={currentImage.url}
              fallbackSrc="https://via.placeholder.com/600x400?text=Caricamento..."
              radius="none"
            />
            
            {/* Icona zoom (hover) */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-black/50 text-white"
                onPress={openLightbox}
                aria-label="Ingrandisci"
              >
                <Maximize2 size={16} />
              </Button>
            </div>
          </div>

          {/* Frecce di navigazione (solo se più di un'immagine) */}
          {displayImages.length > 1 && (
            <>
              <Button
                isIconOnly
                variant="flat"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-md"
                onPress={goToPrevious}
                aria-label="Immagine precedente"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                isIconOnly
                variant="flat"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-md"
                onPress={goToNext}
                aria-label="Immagine successiva"
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail (miniature) */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
            {displayImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all ${
                  currentIndex === index 
                    ? 'ring-2 ring-primary scale-105' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Vai all'immagine ${index + 1}`}
              >
                <Image
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={image.url}
                  removeWrapper
                />
              </button>
            ))}
          </div>
        )}

        {/* Indicatori a pallini (versione alternativa alle thumbnail) */}
        {displayImages.length > 1 && displayImages.length <= 5 && (
          <div className="flex justify-center gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-primary w-4' 
                    : 'bg-default-300 hover:bg-default-400'
                }`}
                aria-label={`Vai all'immagine ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (modal a schermo intero) */}
      <Modal 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)}
        size="full"
        hideCloseButton
        classNames={{
          wrapper: "z-50",
          base: "bg-black/95"
        }}
      >
        <ModalContent>
          {() => (
            <div className="relative h-screen w-screen flex items-center justify-center">
              {/* Bottone chiudi */}
              <Button
                isIconOnly
                variant="light"
                className="absolute top-4 right-4 z-10 text-white"
                onPress={() => setIsLightboxOpen(false)}
                aria-label="Chiudi"
              >
                <X size={24} />
              </Button>

              {/* Immagine grande */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  alt={`${title} - ingrandita`}
                  className="max-w-full max-h-full object-contain"
                  src={displayImages[lightboxIndex].url}
                  removeWrapper
                />
              </div>

              {/* Frecce nel lightbox */}
              {displayImages.length > 1 && (
                <>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30"
                    onPress={lightboxPrevious}
                    aria-label="Precedente"
                  >
                    <ChevronLeft size={32} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30"
                    onPress={lightboxNext}
                    aria-label="Successiva"
                  >
                    <ChevronRight size={32} />
                  </Button>
                </>
              )}

              {/* Contatore nel lightbox */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-small">
                  {lightboxIndex + 1} / {displayImages.length}
                </div>
              )}
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookCarousel;
