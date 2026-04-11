import { createSwap, sendMessage } from "@/misc/api";
import { BOOK_CONDITIONS, BookCondition } from "@/types/bookInfoTypes";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
  Slider,
  RadioGroup,
  Radio,
  Divider,
  addToast,
} from "@heroui/react";
import { useState } from "react";
// Importa il tipo Selection per TypeScript

interface addSwapModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddSwapModal(props: addSwapModalProps) {
  

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.closeModal}
      size="4xl"
      scrollBehavior="inside"
      shouldCloseOnInteractOutside={(element) => {
        // Se l'elemento cliccato appartiene a un popover, non chiudere/bloccare
        return !element.closest('[data-role="popover"]');

      }}

    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add a new book swap</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={props.closeModal}>Cancel</Button>
          <Button
            color="success"
            onPress={async () => {
              const result = await sendMessage("",{swapId:1,swapBookTitle:"",username:""});
              addToast({
                title: result.message,
                color: result.successful === true ? "success" : "danger"
              })
              props.closeModal();
            }}
          >
            Confirm Listing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}