"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Listing, Reservation } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafeListings, SafeReservations } from "@/app/types";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../heart-button";
import Button from "../button";

type ListingCardProps = {
  data: SafeListings;
  reservation?: SafeReservations;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};
const ListingCard = (props: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(props.data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (props.disabled) {
        return;
      }

      props.onAction?.(props.actionId!);
    },
    [props.onAction, props.actionId, props.disabled]
  );

  const price = useMemo(() => {
    if (props.reservation) {
      return props.reservation.totalPrice;
    }

    return props.data.price;
  }, [props.reservation, props.data.price]);

  const reservationDate = useMemo(() => {
    if (!props.reservation) {
      return null;
    }
    const start = new Date(props.reservation.startDate);
    const end = new Date(props.reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [props.reservation]);

  return (
    <div onClick={() => router.push(`/listings/${props.data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full ">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image fill alt="Listing" src={props.data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition" />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={props.data.id} currentUser={props.currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || props.data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!props.reservation && <div className="font-light">night</div>}
        </div>
        {props.onAction && props.actionLabel && <Button disabled={props.disabled} small label={props.actionLabel} onClick={handleCancel} />}
      </div>
    </div>
  );
};

export default ListingCard;
