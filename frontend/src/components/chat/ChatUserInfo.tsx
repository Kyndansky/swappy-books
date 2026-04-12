import { Link } from "react-router-dom";
import MessageAvatar from "./MessageAvatar";
import { Info } from "lucide-react";

interface ChatUserInfoProps {
  username: string;
  bookName: string;
  bookId: number;
  showAsSelected?: boolean;
  isBookTitleLink: boolean; // Usiamo questa prop
}

export default function ChatUserInfo(props: ChatUserInfoProps) {
  const textClassName = "text-xs text-zinc-400 w-full";

  return (
    <div className="flex flex-row gap-3 w-full">
      <MessageAvatar username={props.username} size="md" />
      <div className="flex flex-col">
        <p className={props.showAsSelected ? "text-md text-primary" : "text-md"}>
          {props.username}
        </p>

        {props.isBookTitleLink ? (
          <Link to={"/swap/" + props.bookId} className={textClassName}>
            <div className="flex flex-row justify-center items-center gap-1 text-blue-500">
              {props.bookName}
              <Info size={15} color="#3b82f6"/>
            </div>
          </Link>
        ) : (
          <span className={textClassName}>
            {props.bookName}
          </span>
        )}
      </div>
    </div>
  );
}