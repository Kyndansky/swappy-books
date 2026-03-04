import { User } from "@heroui/react";

interface ChatUserInfoProps {
  username: string;
  bookName: string;
  userIconUrl: string;
}
export default function ChatUserInfo(props: ChatUserInfoProps) {
  return (
    <User
      avatarProps={{
        src: props.userIconUrl,
      }}
      description={props.bookName}
      name={props.username}
    />
  );
}
