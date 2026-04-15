import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import { Swap } from '@/types/interfaces';
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
  TableCell
} from "@heroui/react";

import { fetchSwap, swapToggleFavorite } from '@/misc/api';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Main Column: Book Info */}
          <div className="md:col-span-2 space-y-6">
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
                        // Aggiunge l'ISBN solo se esiste
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
          <div className="md:col-span-1">
            <Card className="shadow-sm border-none bg-default-50 sticky top-6">
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
                          }
                          }
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
    </DefaultLayout>
  );
}