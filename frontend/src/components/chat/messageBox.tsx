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
            <div className={props.sender === "Self" ? "flex flex-col ml-auto" : "flex flex-col mr-auto"}>
                <Chip color={props.sender === "Self" ? "primary" : "default"}
                    className="py-4 relative mx-5">
                    {props.message.content}
                    <p color="default" className="text-[8px] absolute top-[18px] right-2">
                        {props.message.messageTime}
                    </p>
                </Chip>
            </div>

        </React.Fragment>
    )
}