import React from "react";
import EmptyState from "../components/empty-state";
import ClientOnly from "../components/client-only";
import TripsClient from "../components/trips-client";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListings from "../actions/getListings";
import PropertiesClient from "../components/properties-client";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you haven no properties" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
