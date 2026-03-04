import Chat from "@/components/chat";
import ChatUserInfo from "@/components/ChatUserInfo";
import DefaultLayout from "@/layouts/default";
import React from "react";

interface MessagesPageProps {}

export default function Messages(props: MessagesPageProps) {
  return (
    <DefaultLayout>
      <div className="flex flex-row">
        <div className="flex flex-col gap-5">
          <ChatUserInfo
            userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
            username="sigma"
            bookName="sigmaLibro"
          />
          <ChatUserInfo
            userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
            username="sigma"
            bookName="sigmaLibro"
          />
          <ChatUserInfo
            userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
            username="sigma"
            bookName="sigmaLibro"
          />
          <ChatUserInfo
            userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
            username="sigma"
            bookName="sigmaLibro"
          />
          <ChatUserInfo
            userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
            username="sigma"
            bookName="sigmaLibro"
          />
        </div>
        <Chat
          userIconUrl="https://i.pravatar.cc/150?u=a04258114e29026702d"
          username="sigma"
          bookName="sigmaLibro"
          
        />
      </div>
    </DefaultLayout>
  );
}
