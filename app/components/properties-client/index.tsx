"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { SafeListings, SafeReservations, SafeUser } from "@/app/types";
import Container from "../container";
import Heading from "../heading";
import toast from "react-hot-toast";
import ListingCard from "../listing-card";

type PropertiesClientProps = {
  listings: SafeListings[];
  currentUser: SafeUser | null;
};
const PropertiesClient = (props: PropertiesClientProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleting(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {props.listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deleting === listing.id}
              actionLabel="Cancel Reservation"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
