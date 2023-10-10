import React from "react";
import EmptyState from "../components/empty-state";
import ClientOnly from "../components/client-only";
import TripsClient from "../components/trips-client";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips." />
      </ClientOnly>
    );
  }

  return <ClientOnly>
    <TripsClient reservations={reservations} currentUser={currentUser} />
  </ClientOnly>;
};

export default TripsPage;
