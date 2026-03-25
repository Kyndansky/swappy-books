// src/pages/index.tsx
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
} from "@heroui/react";
import { Search, Grid, List, ChevronDown, Plus } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import BookCard from "@/components/BookCard";
import { Swap, SwappyBooksSwapsResponse } from "@/types/interfaces";
import AddSwapModal from "@/components/addSwapModal";


const conditions = [
  { key: "all", label: "Tutte le condizioni" },
  { key: "new", label: "Nuovo" },
  { key: "like-new", label: "Come nuovo" },
  { key: "good", label: "Buono" },
  { key: "acceptable", label: "Accettabile" },
];

interface SwapsListPageProps {
  swapsCollection: "Shop" | "Personal";
  retrieveSwapsFunction: () => Promise<SwappyBooksSwapsResponse>;
}
export default function SwapsListPage(props: SwapsListPageProps) {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddSwapModalOpen, setIsAddSwapModalOpen] = useState<boolean>(false);

  const swapss: Swap[] = [
    {
      id: 1,
      author: "GuiltyThree",
      title: "Shadow Slave",
      condition: "new",
      createdAt: "",
      description: "This is a very cool book which talks about the adventures of Sunless",
      price: 25.12,
      seller: "Kynda",
      type: "fiction"
    }
  ]

  //fetching swap on page load
  useEffect(() => {
    (async () => {
      const response = await props.retrieveSwapsFunction();
      if (response.successful) {
        setSwaps(response.swaps);
      } else {
        addToast({
          title: response.message,
          color: "danger",
        });
      }
    })();
  }, []);

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 relative">
        {props.swapsCollection === "Personal" && (
          <div>
            <Button
              color="primary"
              className="absolute right-5 items-center"
              isIconOnly
              onPress={() => {
                setIsAddSwapModalOpen(true);
              }}
            >
              <Plus size={20} />
            </Button>

            <AddSwapModal
              isOpen={isAddSwapModalOpen}
              closeModal={() => {
                setIsAddSwapModalOpen(false);
              }}
            />
          </div>
        )}
        {/* Barra di ricerca */}
        <div className="max-w-2xl mx-auto mb-6">
          <Input
            classNames={{
              base: "w-full",
              input: "text-medium",
              inputWrapper:
                "h-14 font-normal text-default-500 bg-default-100 dark:bg-default-50",
            }}
            placeholder="Cerca libri per titolo, autore o descrizione..."
            size="lg"
            startContent={<Search size={20} className="text-default-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            radius="lg"
          />
        </div>
        {/* Filtri e toggle */}
        <div className="flex flex-col gap-4 mb-6">

          {/* Filtri e toggle in riga */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" endContent={<ChevronDown size={16} />}>
                    {conditions.find((c) => c.key === selectedCondition)?.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Condizioni"
                  onAction={(key) => setSelectedCondition(key as string)}
                >
                  {conditions.map((cond) => (
                    <DropdownItem key={cond.key}>{cond.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Button variant="flat" className="min-w-[100px]">
                Prezzo: €0 - €100
              </Button>
            </div>

            {/* Toggle griglia/lista */}
            <div className="flex gap-1">
              <Button
                isIconOnly
                variant={viewMode === "grid" ? "solid" : "light"}
                onPress={() => setViewMode("grid")}
              >
                <Grid size={18} />
              </Button>
              <Button
                isIconOnly
                variant={viewMode === "list" ? "solid" : "light"}
                onPress={() => setViewMode("list")}
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </div>
        {/* Header risultati */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Libri disponibili</h1>
          <p className="text-default-500">
            {swaps.length}{" "}
            {swaps.length === 1 ? "libro trovato" : "libri trovati"}
          </p>
        </div>
        {/* Griglia/Lista libri */}
        {swaps.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
                : "flex flex-col gap-4"
            }
          >
            {swapss.map((swap) => (
              <div
                key={swap.id}
                className={viewMode === "list" ? "w-full" : ""}
              >
                <BookCard
                  swap={swap}
                  isListView={viewMode === "list"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-default-500 text-lg">
              Nessun libro trovato
            </p>
          </div>
        )}{" "}
      </div>
    </DefaultLayout>
  );
}
