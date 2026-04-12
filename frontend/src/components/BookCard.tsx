// src/components/BookCard.tsx
import { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Avatar } from "@heroui/react";
import { Heart, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Swap } from '@/types/interfaces';

interface BookCardProps {
  swap: Swap;
  sellerAvatar?: string;
  isListView?: boolean;
}

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

export default function BookCard(props: BookCardProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 50);

  const truncatedDescription = props.swap.description.length > (props.isListView ? 200 : 80)
    ? props.swap.description.substring(0, props.isListView ? 200 : 80) + '...'
    : props.swap.description;

  const timeAgo = formatTimeAgo(props.swap.createdAtDate);
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  // Funzione per gestire il click sulla card
  const handleCardClick = () => {
    navigate(`/swap/${props.swap.id}`);
  };

  // Funzione per gestire il click sul cuore senza propagazione
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  if (props.isListView) {
    return (
      <div onClick={handleCardClick} className="cursor-pointer">
        <Card className="w-full hover:scale-[1.02] transition-transform">
          <div className="flex flex-row">
            <div className="w-[180px] h-[180px] flex-shrink-0">
              <Image
                alt={props.swap.title}
                className="w-full h-full object-cover"
                src={'https://via.placeholder.com/180x180?text=Libro'}
                radius="none"
              />
            </div>

            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{props.swap.title}</h3>
                  <p className="text-default-500">{props.swap.author}</p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={handleHeartClick}
                >
                  <Heart
                    size={20}
                    className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </Button>
              </div>

              <p className="text-default-500 my-3 line-clamp-2">
                {truncatedDescription}
              </p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={`https://i.pravatar.cc/150?u=${props.swap.seller}`}
                      size="sm"
                    />
                    <span className="text-small text-default-600">{props.swap.seller}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-small text-default-500">{rating}</span>
                  </div>

                  <div className="flex items-center gap-2 text-default-400">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span className="text-tiny">{views}</span>
                    </div>
                    <span>•</span>
                    <span className="text-tiny">{timeAgo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-xl">€{props.swap.price}</span>
                  <span className="text-tiny text-default-400 bg-default-100 px-3 py-1 rounded-full">
                    {props.swap.condition === 'new' && 'Nuovo'}
                    {props.swap.condition === 'like-new' && 'Come nuovo'}
                    {props.swap.condition === 'good' && 'Buono'}
                    {props.swap.condition === 'acceptable' && 'Accettabile'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Vista griglia
  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="w-full max-w-[280px] hover:scale-105 transition-transform">
        <CardBody className="overflow-visible p-0 relative">
          <Image
            alt={props.swap.title}
            className="w-full object-cover h-[180px]"
            src={'https://via.placeholder.com/280x180?text=Libro'}
          />

          <Button
            isIconOnly
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
            size="sm"
            variant="flat"
            onClick={handleHeartClick}
          >
            <Heart
              size={18}
              className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </Button>
        </CardBody>

        <CardFooter className="flex flex-col items-start gap-3">
          <div className="w-full">
            <h3 className="text-lg font-bold line-clamp-1">{props.swap.title}</h3>
            <p className="text-small text-default-500">{props.swap.author}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar
                src={`https://i.pravatar.cc/150?u=${props.swap.seller}`}
                size="sm"
                className="min-w-[24px]"
              />
              <span className="text-small text-default-600">{props.swap.seller}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-small text-yellow-500">★</span>
              <span className="text-tiny text-default-500">{rating}</span>
            </div>
          </div>

          <p className="text-small text-default-500 line-clamp-2 relative">
            {truncatedDescription}
            {!props.isListView && props.swap.description.length > 80 && (
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
            <span className="text-primary font-bold text-lg">€{props.swap.price}</span>
            <span className="text-tiny text-default-400 bg-default-100 px-2 py-1 rounded-full">
              {props.swap.condition === 'new' && 'Nuovo'}
              {props.swap.condition === 'like-new' && 'Come nuovo'}
              {props.swap.condition === 'good' && 'Buono'}
              {props.swap.condition === 'acceptable' && 'Accettabile'}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}