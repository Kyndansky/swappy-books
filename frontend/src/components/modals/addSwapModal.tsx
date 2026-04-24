import { createSwap } from "@/misc/api";
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
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookIsbn, setBookIsbn] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookDescription, setBookDescription] = useState<string>("");
  const [bookPrice, setBookPrice] = useState<number>(10.00);

  // Gestione stato tramite Selection (Set)
  const [bookCondition, setBookCondition] = useState<BookCondition['key']>("new");
  const [bookCategory, setBookCategory] = useState<"academic" | "fiction">("academic");

  const isInvalid =
    !bookTitle.trim() ||
    !bookAuthor.trim() ||
    !bookDescription.trim() ||
    !bookCondition ||
    !bookCategory ||
    bookPrice <= 0;

  function resetFields() {
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookIsbn("");
    setBookCondition("new");
    setBookCategory("academic");
    setBookPrice(10.00);
  }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">

              <Input
                label="Book Title"
                placeholder="Enter title"
                variant="bordered"
                value={bookTitle}
                onValueChange={setBookTitle}
                isRequired
              />
              <Input
                label="Author"
                placeholder="Author's name"
                variant="bordered"
                value={bookAuthor}
                onValueChange={setBookAuthor}
              />
              <div className="flex gap-4">
                <Input
                  label="ISBN"
                  placeholder="Optional"
                  variant="bordered"
                  value={bookIsbn}
                  onValueChange={setBookIsbn}
                />


              </div>

              <Textarea
                label="Description"
                placeholder="Describe the book..."
                variant="bordered"
                value={bookDescription}
                onValueChange={setBookDescription}
                minRows={4}
              />
            </div>

            <div className="flex flex-col gap-3 bg-default-50 p-4 rounded-xl">
              <div className="flex flex-col justify-center items-center gap-2 ">
                <h1 className="text-lg mr-auto">Category</h1>
                <RadioGroup
                  orientation="horizontal"
                  value={bookCategory}
                  onValueChange={(value) => setBookCategory(value as "academic" | "fiction")}>
                  <Radio value={"academic"}>
                    Academic
                  </Radio>
                  <Radio value={"fiction"}>
                    Fictional
                  </Radio>
                </RadioGroup>
              </div>
              <Divider className="my-3" />
              <div className="flex flex-col justify-center items-center gap-2 ">
                <h1 className="text-lg mr-auto">Condition</h1>
                <RadioGroup
                  className="mx-10"
                  orientation="horizontal"
                  value={bookCondition}
                  onValueChange={(value) => setBookCondition(value as BookCondition["key"])}>
                  {BOOK_CONDITIONS.map((c) => (
                    <Radio key={c.key} value={c.key}>
                      <p className="text-sm">{c.label}</p>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <Divider className="my-3" />

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-small font-medium">Set Price</span>
                  <Input
                    type="number"
                    variant="flat"
                    size="sm"
                    className="w-24"
                    step="0.01"
                    startContent={<span className="text-default-400 text-small">€</span>}
                    value={bookPrice.toString()}
                    onValueChange={(val) => setBookPrice(Number(val))}
                  />
                </div>
                <Slider
                  step={0.5}
                  maxValue={100}
                  minValue={0}
                  color="success"
                  value={bookPrice}
                  onChange={(value) => setBookPrice(value as number)}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={props.closeModal}>Cancel</Button>
          <Button
            color="success"
            isDisabled={isInvalid}
            onPress={async () => {
              const result = await createSwap(bookTitle, bookAuthor, bookDescription, bookCondition, bookPrice, bookCategory, bookIsbn !== "" ? bookIsbn : undefined);
              addToast({
                title: result.message,
                color: result.successful === true ? "success" : "danger"
              })
              resetFields();
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