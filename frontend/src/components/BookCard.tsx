import { Card, CardBody, CardFooter, Image} from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { Swap } from '@/types/interfaces';
import MessageAvatar from './chat/MessageAvatar';

interface BookCardProps {
  swap: Swap;
  isListView?: boolean;
}


export default function BookCard(props: BookCardProps) {
  let swapConditionClassName = "text-tiny bg-default-100 px-2 py-1 rounded-full text-";
  swapConditionClassName += props.swap.condition === "damaged" ? "danger" : props.swap.condition === "acceptable" ? "warning" : "success";
  const navigate = useNavigate();

  const truncatedDescription = props.swap.description.length > (props.isListView ? 200 : 80)
    ? props.swap.description.substring(0, props.isListView ? 200 : 80) + '...'
    : props.swap.description;

  // Funzione per gestire il click sulla card
  const handleCardClick = () => {
    navigate(`/swap/${props.swap.id}`);
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

              </div>

              <p className="text-default-500 my-3 line-clamp-2">
                {truncatedDescription}
              </p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MessageAvatar size='sm' username={props.swap.seller} />
                    <span className="text-small text-default-600">{props.swap.seller}</span>
                  </div>

                  <div className="flex items-center gap-2 text-default-400">
                    <span className="text-tiny">{props.swap.createdAtDate}</span>
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
        </CardBody>

        <CardFooter className="flex flex-col items-start gap-3">
          <div className="w-full">
            <h3 className="text-lg font-bold line-clamp-1">{props.swap.title}</h3>
            <p className="text-small text-default-500">{props.swap.author}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <MessageAvatar size='sm' username={props.swap.seller} />
              <span className="text-small text-default-600">{props.swap.seller}</span>
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
            <span>{props.swap.createdAtDate}</span>
          </div>

          <div className="flex w-full justify-between items-center mt-1 gap-3">
            <span className="text-primary font-bold text-lg">€{props.swap.price}</span>
            <span className={swapConditionClassName}>
              {props.swap.condition}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}