"use client";

import { SafeReservations, SafeUser } from "@/app/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import Heading from "../heading";
import Container from "../container";
import ListingCard from "../listing-card";

type ReservationClientProps = {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
};

const ReservationClient = (props: ReservationClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {props.reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationClient;
