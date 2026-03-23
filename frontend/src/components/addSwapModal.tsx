import { Modal, ModalContent } from "@heroui/react";

interface addSwapModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function AddSwapModal(props: addSwapModalProps) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalContent>w</ModalContent>
    </Modal>
  );
}
