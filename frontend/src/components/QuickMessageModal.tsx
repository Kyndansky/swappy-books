import { sendMessage } from "@/misc/api";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    addToast,
} from "@heroui/react";
import {  SendHorizontal } from "lucide-react";
import { useState } from "react";
import MessageAvatar from "./chat/MessageAvatar";

interface QuickMessageModalProps {
    messageReceiver: string;
    swapId: number;
    isOpen: boolean;
    closeModal: () => void;
}

export default function QuickMessageModal(props: QuickMessageModalProps) {
    const [messageContent, setMessageContent] = useState<string>("");

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.closeModal}
            size="sm"
            scrollBehavior="inside"
            backdrop="blur"
            classNames={{
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Send message</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col items-center gap-4 py-2">
                        <MessageAvatar username={props.messageReceiver} size="lg"/>
                        <div className="text-center">
                            <p className="text-small text-default-500">Sending a message to</p>
                            <p className="text-medium font-semibold">@{props.messageReceiver}</p>
                        </div>
                        <Input
                            type="text"
                            variant="bordered"
                            labelPlacement="outside"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Don't be rude..."
                            className="mt-2"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={props.closeModal}
                        className="text-default-500"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="shadow"
                        onPress={async () => {
                            if (messageContent === "") return;
                            const result = await sendMessage(messageContent, {
                                swapId: 1,
                                swapBookTitle: "",
                                username: props.messageReceiver
                            });
                            addToast({
                                title: result.message,
                                color: result.successful === true ? "success" : "danger"
                            });

                            if (result.successful) {
                                setMessageContent("");
                                props.closeModal();
                            }
                        }}
                    >
                        <SendHorizontal size={18} />
                        Send
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}