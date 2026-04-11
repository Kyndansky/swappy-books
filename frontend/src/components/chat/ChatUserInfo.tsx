import { Link } from "react-router-dom";
import MessageAvatar from "./MessageAvatar";

interface ChatUserInfoProps {
  username: string;
  bookName: string;
  bookId: number;
  showAsSelected?: boolean;
}
export default function ChatUserInfo(props: ChatUserInfoProps) {
  return (

    <div className="flex flex-row gap-3 w-full">
      <MessageAvatar username={props.username} size="md" />
      <div className="flex flex-col">
        <p className={props.showAsSelected ? "text-md text-primary" : "text-md"}>{props.username}</p>
        <Link to={"/swaps/" + props.bookId} className="text-xs text-zinc-400 w-full">{props.bookName}</Link>
      </div>
    </div>

  );
}
