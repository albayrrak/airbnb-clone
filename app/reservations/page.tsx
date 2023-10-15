import React from "react";

import EmptyState from "@/app/components/empty-state";
import ClientOnly from "@/app/components/client-only";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationClient from "@/app/components/reservation-client";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default ReservationPage;
