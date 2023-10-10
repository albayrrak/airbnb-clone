"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { SafeReservations, SafeUser } from "@/app/types";
import Container from "../container";
import Heading from "../heading";
import toast from "react-hot-toast";
import ListingCard from "../listing-card";

type TripsClientProps = {
  reservations: SafeReservations[];
  currentUser: SafeUser | null;
};
const TripsClient = (props: TripsClientProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleting(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data.error);
        })
        .finally(() => {
          setDeleting("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been and where you're going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {props.reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deleting === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
