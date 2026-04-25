import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { Swap } from '@/types/interfaces';
import MessageAvatar from './chat/MessageAvatar';

interface BookCardProps {
  swap: Swap;
  isListView?: boolean;
}

export default function BookCard(props: BookCardProps) {
  let swapConditionClassName = "text-tiny bg-default-100 px-3 py-1 rounded-full whitespace-nowrap text-";
  swapConditionClassName += props.swap.condition === "damaged" ? "danger" : props.swap.condition === "acceptable" ? "warning" : "success";
  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/swap/${props.swap.id}`);
  };

  const imageSrc = (() => {
    if (props.swap.primaryImageData && props.swap.primaryImageType) {
      return `data:${props.swap.primaryImageType};base64,${props.swap.primaryImageData}`;
    }
    return 'https://via.placeholder.com/280x180?text=Libro';
  })();

  if (props.isListView) {
    return (
      <div onClick={handleCardClick} className="cursor-pointer w-full">
        <Card className="w-full hover:scale-[1.01] transition-transform overflow-hidden">
          <div className="flex flex-row">
            <div className="w-[180px] h-[180px] flex-shrink-0">
              <Image
                removeWrapper
                alt={props.swap.title}
                className="w-full h-full object-cover rounded-none"
                src={imageSrc}
              />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex justify-between items-start">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold truncate">{props.swap.title}</h3>
                    <p className="text-default-500 truncate">{props.swap.author}</p>
                  </div>
                </div>
                <p className="text-default-500 my-3 line-clamp-2">
                  {props.swap.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <MessageAvatar size='sm' username={props.swap.seller} />
                    <span className="text-small text-default-600 truncate">{props.swap.seller}</span>
                  </div>
                  <span className="text-tiny text-default-400 whitespace-nowrap">{props.swap.createdAtDate}</span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-primary font-bold text-xl">€{props.swap.price}</span>
                  <span className={swapConditionClassName}>
                    {props.swap.condition}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div onClick={handleCardClick} className="cursor-pointer h-full w-full">
      <Card className="w-full h-full hover:scale-105 transition-transform flex flex-col overflow-hidden">
        <CardBody className="p-0 relative flex-none h-[220px] w-full overflow-hidden">
          <Image
            removeWrapper
            alt={props.swap.title}
            className="z-0 w-full h-full object-cover rounded-none"
            src={imageSrc}
          />
        </CardBody>

        <CardFooter className="flex flex-col items-start gap-3 flex-grow p-4 min-w-0">
          <div className="w-full h-[48px] min-w-0">
            <h3 className="text-medium font-bold line-clamp-1 break-words">{props.swap.title}</h3>
            <p className="text-small text-default-500 line-clamp-1">{props.swap.author}</p>
          </div>

          <div className="flex items-center gap-2 w-full min-w-0">
            <MessageAvatar size='sm' username={props.swap.seller} />
            <span className="text-small text-default-600 truncate">{props.swap.seller}</span>
          </div>

          <div className="h-[40px] w-full min-w-0">
            <p className="text-small text-default-500 line-clamp-2 leading-tight break-words">
              {props.swap.description}
            </p>
          </div>

          <div className="mt-auto w-full">
            <div className="text-tiny text-default-400 mb-2 whitespace-nowrap">
              {props.swap.createdAtDate}
            </div>
            <div className="flex w-full justify-between items-center gap-2">
              <span className="text-primary font-bold text-lg">€{props.swap.price}</span>
              <span className={swapConditionClassName}>
                {props.swap.condition}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}