import { SafeListings, SafeUser } from "@/app/types";
import React from "react";
import Container from "../container";
import Heading from "../heading";
import ListingCard from "../listing-card";

type FavoritesClientProps = {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
};

const FavoritesClient = (props: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {props.listings.map((listing) => {
          return <ListingCard key={listing.id} currentUser={props.currentUser} data={listing} />;
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
