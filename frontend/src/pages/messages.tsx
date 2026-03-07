import Chat from "@/components/chat/chat";
import ChatUserInfo from "@/components/chat/ChatUserInfo";
import DefaultLayout from "@/layouts/default";
import { Message, UserChatInfo } from "@/types/interfaces";
import { Avatar, Divider, Listbox, ListboxItem } from "@heroui/react";
import React, { useState } from "react";

interface MessagesPageProps { }

export default function Messages(props: MessagesPageProps) {

  const chats: UserChatInfo[] = [
    {
      username: "Riccardo Colaninno",
      swapBookTitle: "Internetworking",
      swapId: 3
    },
    {
      username: "Galimberti Pietro",
      swapBookTitle: "Matematica Verde",
      swapId: 1
    },
    {
      username: "Matteo Sartori",
      swapBookTitle: "Protech",
      swapId: 2
    },
    {
      username: "Davide Riccobene",
      swapBookTitle: "Matematica Verde",
      swapId: 1
    },
  ]
  const messages: Message[] = [
    {
      content: "ciao",
      sender: "Sigma2",
      receiver: "sigma",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "ho detto ciaoo",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "come va?",
      sender: "Sigma2",
      receiver: "sigma",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "ci sei? ",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    },
    {
      content: "ho detto ciaoo",
      sender: "Sigma2",
      receiver: "sigma",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "come va?",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "ci sei? ",
      sender: "Sigma2",
      receiver: "sigma",
      swapId: 1,
      messageTime: "15:45"
    },
    {
      content: "ho detto ciaoo",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "come va?",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    }, {
      content: "ci sei? ",
      sender: "sigma",
      receiver: "Sigma2",
      swapId: 1,
      messageTime: "15:45"
    },
  ]
  const [selectedChat, setSelectedChat] = useState<UserChatInfo>();
  return (
    <DefaultLayout>
      <div className="flex flex-row justify-center">
        <Listbox aria-label="Listbox menu with descriptions" variant="flat" className="w-auto" selectionMode="single" selectionBehavior={"replace"}>
          {chats.map((chat, index) => (
            <ListboxItem key={index}>
              <ChatUserInfo
                username={chat.username}
                bookName={chat.swapBookTitle} />
            </ListboxItem>
          ))}
        </Listbox>
        <Divider orientation="vertical" className="mx-20 h-auto" />
        <div className="flex w-1/2 justify-center align-items-center">
          {selectedChat ? (
            <Chat
              chatInfo={selectedChat}
              messages={messages}
            />
          ) : (
            <p className="my-auto">select a chat to view messages</p>
          )}

        </div>
      </div>
    </DefaultLayout>
  );
}