import {User} from "@heroui/react";

interface ChatUserInfoProps{
    username:String;
    bookName:String;
    userIconUrl:String;
}
export default function ChatUserInfo(){
    <User
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
      description="Product Designer"
      name="Jane Doe"
    />
}