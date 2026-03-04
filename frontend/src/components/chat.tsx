import { Message } from "@/types/interfaces";
import { User } from "@heroui/react";
import React from "react";

interface ChatProps {
  username: string;
  bookName: string;
  userIconUrl: string;
//   messages: Message;
}
export default function Chat(props: ChatProps) {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <User
          avatarProps={{
            src: props.userIconUrl
          }}
          description={props.bookName}
          name={props.username}
        />
        bla ajdakdjakdj here are the messages
      </div>
    </React.Fragment>
  );
}
