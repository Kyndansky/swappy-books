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
  Slider,
  Checkbox,
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
  retrieveSwapsFunction: (searchString?: string, minPrice?: number, maxPrice?: number, conditions?: string[], type?: "academic" | "fictional") => Promise<SwappyBooksSwapsResponse>;
}
export default function SwapsListPage(props: SwapsListPageProps) {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [searchString, setSearchString] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]); //todo: implement in UI
  const [bookCategory, setBookCategory] = useState<"any" | "fictional" | "academic">("any"); //todo: implement in UI
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddSwapModalOpen, setIsAddSwapModalOpen] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<number[]>([0, 100]); //where [0] is the min price and [1] is the max price
  const [isEnabledMinPrice, setIsEnabledMinPrice] = useState(false);
  const [isEnabledMaxPrice, setIsEnabledMaxPrice] = useState(false);

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

  //fetches swaps based on current filters and shows error if a problem occurs
  async function handleSwapsFetch() {
    const result: SwappyBooksSwapsResponse = await props.retrieveSwapsFunction(searchString,
      isEnabledMinPrice === true ? priceFilter[0] : undefined,
      isEnabledMaxPrice === true ? priceFilter[1] : undefined,
      selectedConditions,
      bookCategory !== "any" ? bookCategory : undefined);

    if (!result.successful) {
      addToast({
        title: result.message,
        color: "danger"
      });
      return;
    }

    setSwaps(result.swaps);

  }

  //debounced search when changing filters
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSwapsFetch();
    }, 500);

    // Cleanup: last timer is deleted if something changes before it expires, renewing its count
    return () => clearTimeout(timer);
  }, [searchString, priceFilter]);


  const handlePriceChange = (value: number | number[]) => {
    const [newMin, newMax] = value as number[];

    // Aggiorna i valori dello slider
    setPriceFilter([newMin, newMax]);

    // Abilita automaticamente i checkbox quando l'utente sposta gli handle
    if (newMin !== priceFilter[0]) {
      // Se l'handle sinistro si è mosso
      if (!isEnabledMinPrice && newMin > 0) {
        setIsEnabledMinPrice(true);
      }
      // Se l'handle sinistro torna a 0, disabilita
      if (isEnabledMinPrice && newMin === 0 && newMax === 100) {
        setIsEnabledMinPrice(false);
      }
    }

    if (newMax !== priceFilter[1]) {
      // Se l'handle destro si è mosso
      if (!isEnabledMaxPrice && newMax < 100) {
        setIsEnabledMaxPrice(true);
      }
      // Se l'handle destro torna a 100, disabilita
      if (isEnabledMaxPrice && newMin === 0 && newMax === 100) {
        setIsEnabledMaxPrice(false);
      }
    }
  };


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
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <Input
            classNames={{
              base: "w-full",
              input: "text-medium",
              inputWrapper:
                "h-14 font-normal text-default-500 bg-default-100 dark:bg-default-50",
            }}
            placeholder="Search books by title"
            size="lg"
            startContent={<Search size={20} className="text-default-400" />}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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

            </div>

            {/* price filter section */}
            <div className="flex flex-row  ml-3 mr-auto w-2/5 items-center gap-3">

              {/* min and max price checkboxes */}
              <div className="flex flex-col">
                <Checkbox
                  size="sm"
                  isSelected={isEnabledMinPrice}
                  onValueChange={setIsEnabledMinPrice}
                >
                  Min
                </Checkbox>
                <Checkbox
                  size="sm"
                  isSelected={isEnabledMaxPrice}
                  onValueChange={setIsEnabledMaxPrice}
                >
                  Max
                </Checkbox>
              </div>

              {/* slider and labels on top of slider */}
              <div className="flex flex-col w-1/3">
                <div className="relative h-6 -mb-1.5">
                  <div
                    className="absolute text-xs text-primary cursor-pointer hover:scale-110 transition-transform whitespace-nowrap"
                    style={{
                      left: `${(priceFilter[0] / 100) * 100}%`,
                      transform: 'translateX(-50%)',
                      ...(priceFilter[0] > 85 && { transform: 'translateX(-100%)' }) // Se troppo a destra, allinea a sinistra
                    }}
                  >
                    ↓ €{isEnabledMinPrice === true ? priceFilter[0] : "-"}
                  </div>
                  <div
                    className="absolute text-xs text-primary cursor-pointer hover:scale-110 transition-transform whitespace-nowrap"
                    style={{
                      left: `${(priceFilter[1] / 100) * 100}%`,
                      transform: priceFilter[1] > 85 ? 'translateX(-100%)' : 'translateX(-50%)',
                      ...(priceFilter[1] < 15 && { transform: 'translateX(0%)' }) // Se troppo a sinistra, allinea a destra
                    }}
                  >
                    €{isEnabledMaxPrice === true ? priceFilter[1] : "-"} ↑
                  </div>
                </div>

                <Slider
                  className="mx-3"
                  size="sm"
                  formatOptions={{ style: "currency", currency: "USD" }}
                  maxValue={100}
                  minValue={0}
                  value={priceFilter}
                  step={5}
                  onChange={(value) => {
                    // setPriceFilter(value as number[]);
                    handlePriceChange(value);
                  }}
                  aria-label={"Price filter slider"}
                />
              </div>
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
