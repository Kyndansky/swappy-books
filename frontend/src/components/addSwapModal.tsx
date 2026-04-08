import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface addSwapModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
export default function AddSwapModal(props: addSwapModalProps) {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={() => props.closeModal()}
      size="5xl"
    >
      <ModalContent>
        <ModalHeader>Add a swap here</ModalHeader>
        <ModalBody>
          {/* todo: inserimento info per upload swap
titolo libro
isbn (opzionale)
descrizione
condizioni
prezzo
autore
tipo (accademico o fiction) */}
          kdadkad
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              props.closeModal();
            }}
          >
            Cancel
          </Button>
          <Button
            color="success"
            onPress={() => {
              //todo: api call to backend to add swap
              props.closeModal();
            }}
          >
            Conferma
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
