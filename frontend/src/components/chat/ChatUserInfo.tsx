import { User } from "@heroui/react";

interface ChatUserInfoProps {
  username: string;
  bookName: string;
  showAsSelected?:boolean;
}
export default function ChatUserInfo(props: ChatUserInfoProps) {
  return (
    <div className="pointer-events-none">
      <User
        avatarProps={{
          src: "https://images.unsplash.com/",
        }}
        description={props.bookName}
        name={props.username}
        className={props.showAsSelected?"text-primary":""}
      />
    </div>

  );
}
