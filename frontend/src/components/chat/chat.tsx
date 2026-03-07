import { Message, UserChatInfo } from "@/types/interfaces";
import { Button, User } from "@heroui/react";
import React from "react";
import ChatUserInfo from "./ChatUserInfo";
import MessageBox from "./messageBox";
import { useAuth } from "@/contexts/AuthContextHandler";
import { X } from "lucide-react";

interface ChatProps {
  chatInfo: UserChatInfo;
  messages: Message[];
  onClose: () => void;
}
export default function Chat(props: ChatProps) {
  // const { username } = useAuth();
  // const username = "sigma2";
  const username = "sigma";
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 w-full relative ">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          size="sm"
          // La classe 'group' sul padre permette di controllare il figlio all'hover
          className="group absolute right-0"
          onPress={() => {
            props.onClose();
          }}
        >
          <X size={15} className="transition-transform duration-200 ease-in-out group-hover:rotate-[180deg]" />
        </Button>
        <div className="mx-auto">
          <ChatUserInfo
            bookName={props.chatInfo.swapBookTitle}
            username={props.chatInfo.username}
          />
        </div>

        <div className="flex flex-col overflow-y-scroll flex-1 w-auto gap-2 ">
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
