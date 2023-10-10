"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { Reservation } from "@prisma/client";

import { SafeListings, SafeReservations, SafeUser } from "@/app/types";
import { categories } from "@/app/components/categories";

import Container from "@/app/components/container";
import ListingHead from "@/app/components/listing-head";
import ListingInfo from "@/app/components/listing-info";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import ListingReservation from "@/app/components/listing-reservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type ListingClientProps = {
  reservations?: SafeReservations[];
  listing: SafeListings & {
    user: SafeUser;
  };

  currentUser: SafeUser | null;
};

const ListingClient = (props: ListingClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    props.reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [props.reservations]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(props.listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!props.currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: props.listing.id,
      })
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, props.listing.id, props.currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && props.listing.id) {
        setTotalPrice(dayCount * props.listing.price);
      } else {
        setTotalPrice(props.listing.price);
      }
    }
  }, [dateRange, props.listing.price]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === props.listing.category);
  }, [props.listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={props.listing.title}
            imageSrc={props.listing.imageSrc}
            locationValue={props.listing.locationValue}
            id={props.listing.id}
            currentUser={props.currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={props.listing.user}
              category={category}
              description={props.listing.description}
              roomCount={props.listing.roomCount}
              guestCount={props.listing.roomCount}
              bathroomCount={props.listing.bathroomCount}
              locationValue={props.listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={props.listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
