import { Message, UserChatInfo } from "@/types/interfaces";
import { User } from "@heroui/react";
import React from "react";
import ChatUserInfo from "./ChatUserInfo";
import MessageBox from "./messageBox";
import { useAuth } from "@/contexts/AuthContextHandler";
  
interface ChatProps {
  chatInfo:UserChatInfo;
  messages: Message[];
}
export default function Chat(props: ChatProps) {
  // const { username } = useAuth();
  // const username = "sigma2";
  const username = "sigma";
  return (
    <React.Fragment>

      <div className="flex flex-col gap-4">
        <ChatUserInfo
          bookName={props.chatInfo.swapBookTitle}
          username={props.chatInfo.username}
          />
        <div className="flex flex-col overflow-y-scroll h-50 w-auto gap-2">
          {props.messages.map((msg, index) => (
            <MessageBox key={index}
              message={msg}
              sender={username === msg.sender ? "Self" : "Other"} />
          ))}
      
        </div>
      </div>
    </React.Fragment>
  );
}
