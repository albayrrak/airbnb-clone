"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modals from "../modals";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../country-select";
import { formatISO, set } from "date-fns";
import qs from "query-string";
import Heading from "../heading";
import Calendar from "../calendar";
import Counter from "../counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [steps, setSteps] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setSteps((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setSteps((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuey: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };

    if (dateRange.startDate) {
      updatedQuey.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuey.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuey,
      },
      { skipNull: true }
    );

    setSteps(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [steps, searchModal, location, router, guestCount, roomCount, bathRoomCount, dateRange, onNext, params]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
      <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (steps === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title=" When do you plan to go?" subtitle="Make sure everyone is free!" />
        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter title="Guests" subtitle="How many guests are coming" value={guestCount} onChange={(value) => setGuestCount(value)} />
        <Counter title="Rooms" subtitle="How many rooms do you need" value={roomCount} onChange={(value) => setRoomCount(value)} />
        <Counter title="BathRooms" subtitle="How many bathroom do you need" value={bathRoomCount} onChange={(value) => setBathRoomCount(value)} />
      </div>
    );
  }

  return (
    <Modals
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
