import { Message, UserChatInfo } from "@/types/interfaces";
import { Button } from "@heroui/react";
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
  const { username } = useAuth();

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 w-full relative h-full flex-1 min-h-0">
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
        <div className="mx-auto flex-none">
          <ChatUserInfo
            bookId={props.chatInfo.swapId}
            bookName={props.chatInfo.swapBookTitle}
            username={props.chatInfo.username}
            isBookTitleLink
          />
        </div>

        <div className="flex flex-col overflow-y-auto flex-1 w-auto gap-3 min-h-0 mb-6">
          {props.messages.map((msg, index) => {
            const isSelf = username === msg.sender;
            return (
              <div
                key={index}
                className={`flex flex-col w-full ${index === 0 ? "mt-auto" : ""} ${isSelf ? "items-end" : "items-start"}`}
              >
                <MessageBox
                  message={msg}
                  sender={isSelf ? "Self" : "Other"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
