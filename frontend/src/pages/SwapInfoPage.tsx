import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import { Swap, BookImage } from '@/types/interfaces';
import {
  Button,
  Spinner,
  addToast,
  Alert,
  Chip,
  Divider,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image
} from "@heroui/react";

import { fetchSwap, swapToggleFavorite, getImageUrl } from '@/misc/api';
import { useAuth } from '@/contexts/AuthContextHandler';
import React from 'react';
import MessageAvatar from '@/components/chat/MessageAvatar';
import QuickMessageModal from '@/components/modals/QuickMessageModal';

export default function SwapInfoPage() {
  const { id } = useParams<{ id: string }>();
  const swapId: number = parseInt(id || '0');
  const navigate = useNavigate();

  const [swap, setSwap] = useState<Swap>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, username } = useAuth();
  const [isMessageMOdalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  useEffect(function () {
    async function loadSwap() {
      const response = await fetchSwap(swapId);
      if (response.successful === true) {
        setSwap(response.swap);
      } else {
        addToast({
          title: response.message,
          color: "danger"
        });
      }
      setIsLoading(false);
    }
    loadSwap();
  }, [swapId]);

  if (isLoading === true) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" label="Loading book..." />
        </div>
      </DefaultLayout>
    );
  }

  if (!swap) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Alert color='danger'>There was an error while fetching this swap's information. Retry later</Alert>
          <Button color="primary" onPress={function () { navigate('/') }}>
            Go to the home page
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Column: Images */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            {(swap.images && swap.images.length > 0) ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Image
                    src={getImageUrl(swap.images[0].id)}
                    alt={swap.title}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                </div>
                {swap.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {swap.images.map((img: BookImage, idx: number) => (
                      <Image
                        key={img.id}
                        src={getImageUrl(img.id)}
                        alt={`${swap.title} - ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Image
                src={'https://via.placeholder.com/400x500?text=No+Image'}
                alt={swap.title}
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
            )}
          </div>

          {/* Right Column: Book Info + Seller Sidebar */}
          <div className="flex-1 flex flex-col xl:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col gap-8">
                {/* 1. Header Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold">{swap.title}</h1>
                    <p className="text-xl text-default-500 mt-1">{swap.author}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-primary">€{swap.price}</span>
                    <Chip
                      variant="flat"
                      size="lg"
                      color={swap.condition === "damaged" ? "danger" : swap.condition === "acceptable" ? "warning" : swap.condition === "good" ? "primary" : "success"}>
                      {swap.condition.toUpperCase()}
                    </Chip>
                  </div>

                  <div className="flex items-center gap-2">
                    {!swap.sellDate ? (
                      <React.Fragment>
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-success">Available</span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="w-2 h-2 rounded-full bg-danger" />
                        <span className="text-danger">Unavailable</span>
                      </React.Fragment>
                    )}
                  </div>
                </div>

                <Divider />

                {/* 2. Description and Details */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="text-default-700 leading-relaxed whitespace-pre-line">{swap.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Details</h2>
                    <Table
                      aria-label="Book details"
                      hideHeader
                      isStriped
                      className="max-w-md"
                    >
                      <TableHeader>
                        <TableColumn>Label</TableColumn>
                        <TableColumn>Value</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {[
                          { key: "seller", label: "Seller", value: swap.seller },
                          { key: "price", label: "Price", value: "€" + swap.price },
                          { key: "type", label: "Category", value: swap.type.toUpperCase() },
                          { key: "condition", label: "Condition", value: swap.condition.toUpperCase() },
                          ...(swap.isbn ? [{ key: "isbn", label: "ISBN", value: swap.isbn, mono: true }] : []),
                          { key: "date", label: "Listing Date", value: swap.createdAtDate }
                        ].map((row) => (
                          <TableRow key={row.key}>
                            <TableCell className="text-tiny text-default-400 uppercase font-bold">
                              {row.label}
                            </TableCell>
                            <TableCell className={`text-default-700 font-medium ${row.mono ? "font-mono" : ""}`}>
                              {row.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Seller Card and Actions */}
            <div className="w-full xl:w-80 flex-shrink-0">
              <Card className="shadow-sm border-none bg-default-50 xl:sticky xl:top-6">
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <MessageAvatar username={swap.seller} size={'lg'} />
                    <div>
                      <h3 className="text-xl font-semibold">
                        {username === swap.seller ? username + " (You)" : swap.seller}
                      </h3>
                    </div>
                  </div>

                  {username !== swap.seller ? (
                    <React.Fragment>
                      <div className="flex flex-col gap-3">
                        <Button
                          color="primary"
                          className="w-full font-semibold"
                          startContent={<MessageCircle size={20} />}
                          onPress={() => {
                            if (isAuthenticated === false) {
                              navigate("/login")
                            }
                            else {
                              setIsMessageModalOpen(true);
                            }
                          }}
                        >
                          Contact Seller
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            variant="flat"
                            color={swap.favorite===true ? "danger" : "default"}
                            className="flex-1 font-semibold"
                            startContent={<Heart size={20} fill={swap.favorite===true ? "currentColor" : "none"} />}
                            onPress={async () => {
                              const result = await swapToggleFavorite(swap.id);
                              swap.favorite= swap.favorite===true?true:false;
                              console.log(result);
                              if (result.successful === false) {
                                addToast(
                                  {
                                    title: result.message,
                                    color: "danger"
                                  }
                                )
                              }
                            }}
                          >
                            {swap.favorite===true ? "In favorites" : "Add to favorites"}
                          </Button>

                          <Button
                            isIconOnly
                            variant="flat"
                            aria-label="Share"
                          >
                            <Share2 size={20} />
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (null)}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        <QuickMessageModal
          isOpen={isMessageMOdalOpen}
          closeModal={() => { setIsMessageModalOpen(false) }}
          messageReceiver={swap.seller}
          swapId={swap.id}
        />
      </div>
    </DefaultLayout>
  );
}