import useFavorites from "@/app/hooks/useFavorites";
import { SafeUser } from "@/app/types";
import React, { use } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};
const HeartButton = (props: HeartButtonProps) => {
  const { listingId, currentUser } = props;
  const { hasFavorited, toggleFavorite } = useFavorites({ listingId, currentUser });
  
  
  return (

    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  );
};

export default HeartButton;
