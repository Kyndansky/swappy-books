import { Message } from "@/types/interfaces";
import { Chip } from "@heroui/react";
import React from "react";

interface MessageBoxProps {
    sender: "Self" | "Other";
    message: Message
}

export default function MessageBox(props: MessageBoxProps) {
    return (
        <React.Fragment>
            <div className={props.sender === "Self" ? "flex flex-col ml-50" : "flex flex-col mr-50"}>
                <Chip color={props.sender === "Self" ? "success" : "default"}
                    className="py-4 relative">
                    {props.message.content}
                    <p color="default" className="text-[8px] absolute top-[18px] right-2">
                        {props.message.messageTime}
                    </p>
                </Chip>

            </div>

        </React.Fragment>
    )
}