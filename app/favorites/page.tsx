import React from "react";

import EmptyState from "../components/empty-state";
import ClientOnly from "../components/client-only";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavorites";
import FavoritesClient from "../components/favorite-client";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
