"use client";

import React from "react";

import { Range } from "react-date-range";
import Calendar from "../calendar";
import Button from "../button";

type ListingReservationProps = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};
const ListingReservation = (props: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${props.price}</div>
        <div className="font-light text-neutral-600 ">night</div>
      </div>
      <hr />
      <Calendar value={props.dateRange} disabledDates={props.disabledDates} onChange={(value) => props.onChangeDate(value.selection)} />
      <hr />
      <Button disabled={props.disabled} label="Reserve" onClick={props.onSubmit} />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div> $ {props.totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
