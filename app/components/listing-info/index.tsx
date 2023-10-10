"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../avatar";
import ListingCategory from "../listing-category";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), {
  ssr: false,
});

type ListingInfoProps = {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};
const ListingInfo = (props: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinate = getByValue(props.locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="">Hosted by {props.user.name}</div>
          <Avatar src={props.user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{props.guestCount} guests</div>
          <div>{props.roomCount} rooms</div>
          <div>{props.bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />

      {props.category && <ListingCategory icon={props.category.icon} label={props.category.label} description={props.category.description} />}
      <hr />
      <div className="text-lg font-light text-neutral-500 ">{props.description}</div>
      <hr />
      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;
