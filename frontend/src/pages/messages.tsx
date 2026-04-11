import Chat from "@/components/chat/chat";
import ChatUserInfo from "@/components/chat/ChatUserInfo";
import { useAuth } from "@/contexts/AuthContextHandler";
import DefaultLayout from "@/layouts/default";
import { getChatMessages, getUserChats, sendMessage } from "@/misc/api";
import { Message, UserChatInfo } from "@/types/interfaces";
import {
  addToast,
  Alert,
  Button,
  Divider,
  Input,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";

interface MessagesPageProps { }

export default function Messages(props: MessagesPageProps) {

  const [chats, setChats] = useState<UserChatInfo[]>([]);
  const [selectedChat, setSelectedChat] = useState<UserChatInfo>();
  const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const { isAuthenticated, isLoadingAuthentication, username } = useAuth();
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
        console.log(selectedChat);
        console.log(response);
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

  async function handleSendMessage() {
    if (selectedChat && username) {
      const response = await sendMessage(messageInput, selectedChat);
      if (response.successful) {
        const newMsg = response.sentMessage;
        if (newMsg) {
          setCurrentChatMessages((prevMessages) => [...prevMessages, newMsg]);
        }
      } else {
        addToast({
          title: response.message,
          color: "danger",
        });
      }
      setMessageInput("");
    }
  }

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
                <div className="flex flex-row gap-2 w-full mt-auto">
                  <Input
                    value={messageInput}
                    type="text"
                    className="mt-auto"
                    placeholder="Type message here"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (messageInput !== "") {
                          handleSendMessage();
                        }
                      }
                    }}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                    }}
                  />
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSendMessage();
                      setMessageInput("");
                    }}
                  >
                    <SendHorizonal />
                  </Button>
                </div>
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
