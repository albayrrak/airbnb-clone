import Image from "next/image";
import ClientOnly from "./components/client-only";
import Container from "./components/container";
import EmptyState from "./components/empty-state";
import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "./components/listing-card";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => {
            return <ListingCard key={listing.id} currentUser={currentUser} data={listing} />;
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
