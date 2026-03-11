import Chat from "@/components/chat/chat";
import ChatUserInfo from "@/components/chat/ChatUserInfo";
import { useAuth } from "@/contexts/AuthContextHandler";
import DefaultLayout from "@/layouts/default";
import { getChatMessages, getUserChats } from "@/misc/api";
import { Message, UserChatInfo } from "@/types/interfaces";
import { addToast, Alert, Divider, Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";

interface MessagesPageProps {}

export default function Messages(props: MessagesPageProps) {
  const chatss: UserChatInfo[] = [
    {
      username: "Riccardo Colaninno",
      swapBookTitle: "Internetworking",
      swapId: 3,
    },
    {
      username: "Galimberti Pietro",
      swapBookTitle: "Matematica Verde",
      swapId: 1,
    },
    {
      username: "Matteo Sartori",
      swapBookTitle: "Protech",
      swapId: 2,
    },
    {
      username: "Davide Riccobene",
      swapBookTitle: "Matematica Verde",
      swapId: 1,
    },
  ];
  // const messages: Message[] = [
  //   {
  //     content: "ciao",
  //     sender: "Sigma2",
  //     receiver: "sigma",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ho detto ciaoo",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "come va?",
  //     sender: "Sigma2",
  //     receiver: "sigma",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ci sei? ",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ho detto ciaoo",
  //     sender: "Sigma2",
  //     receiver: "sigma",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "come va?",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ci sei? ",
  //     sender: "Sigma2",
  //     receiver: "sigma",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ho detto ciaoo",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "come va?",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  //   {
  //     content: "ci sei? ",
  //     sender: "sigma",
  //     receiver: "Sigma2",
  //     swapId: 1,
  //     messageTime: "15:45",
  //   },
  // ];
  const [chats, setChats] = useState<UserChatInfo[]>([]);
  const [selectedChat, setSelectedChat] = useState<UserChatInfo>();
  const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);
  const { isAuthenticated, isLoadingAuthentication } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getUserChats();
      if (response.successful) {
        setChats(response.chats);
      } else {
        addToast({
          title: response.message,
          color: "danger",
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedChat) {
        const response = await getChatMessages(selectedChat);
        if (response.successful) {
          setCurrentChatMessages(response.messages);
        } else {
          addToast({
            color: "danger",
            title: response.message,
          });
        }
      }
    })();
  }, [selectedChat]);

  return (
    <DefaultLayout>
      {isLoadingAuthentication === false && isAuthenticated === false ? (
        <div className="flex flex-row justify-center my-auto">
          <Alert color="danger" variant="faded">
            Not authenticated, messages can't be loaded
          </Alert>
        </div>
      ) : (
        <div className="flex flex-row justify-center h-full">
          <Listbox
            variant="faded"
            color="primary"
            className="w-auto"
            selectionBehavior={"replace"}
          >
            {chats?.map((chat, index) => (
              <ListboxItem
                key={index}
                onClick={() => {
                  setSelectedChat(chat);
                }}
                showDivider={true}
              >
                <ChatUserInfo
                  username={chat.username}
                  bookName={chat.swapBookTitle}
                  showAsSelected={
                    selectedChat?.swapId === chat.swapId &&
                    selectedChat.username === chat.username
                      ? true
                      : false
                  }
                />
              </ListboxItem>
            ))}
          </Listbox>
          <Divider orientation="vertical" className="mx-10 h-auto" />
          <div className="flex w-3/4 justify-center align-items-center">
            {selectedChat ? (
              <div className="flex flex-col items-center w-full">
                <Chat
                  chatInfo={selectedChat}
                  messages={currentChatMessages}
                  onClose={() => {
                    setSelectedChat(undefined);
                  }}
                />
              </div>
            ) : (
              <p className="my-auto">select a chat to view messages</p>
            )}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
