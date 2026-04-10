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
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";
import { useState } from "react";

interface addSwapModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddSwapModal(props: addSwapModalProps) {
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookIsbn, setBookIsbn] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookDescription, setBookDescription] = useState<string>("");
  const [bookCondition, setBookCondition] = useState<BookCondition["key"]>("new");
  const [bookPrice, setBookPrice] = useState<number>(10);
  const [bookType, setBookType] = useState<"academic" | "fiction">("academic");


  // Validation logic
  const isInvalid =
    !bookTitle.trim() ||
    !bookAuthor.trim() ||
    !bookDescription.trim() ||
    !bookCondition ||
    !bookType ||
    bookPrice <= 0;

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.closeModal}
      size="4xl"
      scrollBehavior="inside"
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
                isRequired
              />
              <div className="flex gap-4">
                <Input
                  label="ISBN"
                  placeholder="Optional"
                  variant="bordered"
                  value={bookIsbn}
                  onValueChange={setBookIsbn}
                />
                <Select
                  label="Category"
                  variant="bordered"
                  defaultSelectedKeys={[bookType]}
                  onChange={(e) => setBookType(e.target.value as "academic" | "fiction")}
                  isRequired
                >
                  <SelectItem key={"academic"} textValue="academic" id="academic">
                    academic
                  </SelectItem>
                  <SelectItem key={"fiction"} textValue="fiction" id="fiction">
                    fiction
                  </SelectItem>
                </Select>
              </div>
              <Textarea
                label="Description"
                placeholder="Describe the book's content or highlights..."
                variant="bordered"
                value={bookDescription}
                onValueChange={setBookDescription}
                minRows={4}
                isRequired
              />
            </div>

            <div className="flex flex-col gap-6 bg-default-50 p-4 rounded-xl">
              <Select
                label="Book Condition"
                variant="flat"
                defaultSelectedKeys={[bookCondition]}
                onChange={(e) => setBookCondition(e.target.value as BookCondition["key"])}
                isRequired
              >
                {BOOK_CONDITIONS.map((c) => (
                  <SelectItem key={c.key}>
                    {c.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-small font-medium">Set Price</span>
                  <Input
                    type="number"
                    variant="flat"
                    size="sm"
                    className="w-24"
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
                  aria-label="Price Slider"
                />
              </div>

              <div className="text-tiny text-default-400 mt-auto italic">
                Note: Accurate descriptions and fair pricing help your book sell faster.
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={props.closeModal}>
            Cancel
          </Button>
          <Button
            color="success"
            isDisabled={isInvalid}
            onPress={() => {
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