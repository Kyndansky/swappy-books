import { createSwap, uploadBookImages } from "@/misc/api";
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
  Image,
} from "@heroui/react";
import { useState, useRef } from "react";

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
  const [bookImages, setBookImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bookCondition, setBookCondition] = useState<BookCondition['key']>("new");
  const [bookCategory, setBookCategory] = useState<"academic" | "fiction">("academic");

  const isInvalid =
    !bookTitle.trim() ||
    !bookAuthor.trim() ||
    !bookDescription.trim() ||
    !bookCondition ||
    !bookCategory ||
    bookPrice <= 0;

  function handleImageSelect(files: FileList | null) {
    if (!files) return;
    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    }

    setBookImages(prev => [...prev, ...newFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index]);
    setBookImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    
    if (primaryImageIndex >= index && primaryImageIndex > 0) {
      setPrimaryImageIndex(prev => prev - 1);
    } else if (primaryImageIndex === index && imagePreviews.length === 1) {
      setPrimaryImageIndex(0);
    }
  }

  function resetFields() {
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookIsbn("");
    setBookCondition("new");
    setBookCategory("academic");
    setBookPrice(10.00);
    setBookImages([]);
    setImagePreviews([]);
    setPrimaryImageIndex(0);
  }

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
                <h1 id="category-label" className="text-lg mr-auto">Category</h1>
                <RadioGroup
                  aria-labelledby="category-label"
                  orientation="horizontal"
                  value={bookCategory}
                  onValueChange={(value) => setBookCategory(value as "academic" | "fiction")}>
                  <Radio value={"academic"}>Academic</Radio>
                  <Radio value={"fiction"}>Fictional</Radio>
                </RadioGroup>
              </div>
              <Divider className="my-3" />
              <div className="flex flex-col justify-center items-center gap-2 ">
                <h1 id="condition-label" className="text-lg mr-auto">Condition</h1>
                <RadioGroup
                  aria-labelledby="condition-label"
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
                  <span id="price-label" className="text-small font-medium">Set Price</span>
                  <Input
                    aria-labelledby="price-label"
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
                  aria-label="Price slider"
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

          <Divider className="my-4" />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 id="images-label" className="text-lg">Book Images</h1>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageSelect(e.target.files)}
                aria-labelledby="images-label"
              />
              <Button
                size="sm"
                variant="flat"
                onPress={() => fileInputRef.current?.click()}
              >
                Add Images
              </Button>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border border-default-200 shadow-sm group">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="z-0 w-full h-full object-cover rounded-none"
                      removeWrapper
                    />
                    <div className="absolute top-0 right-0 p-1 flex flex-row-reverse gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => removeImage(index)}
                        className="w-6 h-6 min-w-6 bg-black/60 backdrop-blur-sm text-white hover:bg-danger"
                        aria-label="Remove image"
                      >
                        ✕
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color={primaryImageIndex === index ? "success" : "default"}
                        variant="flat"
                        onPress={() => setPrimaryImageIndex(index)}
                        className={`w-6 h-6 min-w-6 bg-black/60 backdrop-blur-sm ${primaryImageIndex === index ? 'text-success' : 'text-white'}`}
                        aria-label="Set as primary"
                      >
                        {primaryImageIndex === index ? "★" : "○"}
                      </Button>
                    </div>
                    {primaryImageIndex === index && (
                      <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-success rounded-full z-10">
                        <span className="text-white text-tiny font-bold">Primary</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length === 0 && (
              <div className="border-2 border-dashed border-default-300 rounded-lg p-6 text-center">
                <p className="text-default-400 text-small">
                  No images added. Click "Add Images" to upload photos of the book.
                </p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={props.closeModal}>Cancel</Button>
          <Button
            color="success"
            isDisabled={isInvalid}
            onPress={async () => {
              const result = await createSwap(bookTitle, bookAuthor, bookDescription, bookCondition, bookPrice, bookCategory, bookIsbn !== "" ? bookIsbn : undefined);
              if (!result.successful) {
                addToast({ title: result.message, color: "danger" });
                return;
              }
              if (bookImages.length > 0 && result.bookId) {
                const imageResult = await uploadBookImages(result.bookId, bookImages, primaryImageIndex);
                addToast({ 
                  title: imageResult.successful ? result.message : "Book created but images failed", 
                  color: imageResult.successful ? "success" : "warning" 
                });
              } else {
                addToast({ title: result.message, color: "success" });
              }
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