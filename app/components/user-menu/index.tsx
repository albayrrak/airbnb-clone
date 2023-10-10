"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../avatar";
import MenuItem from "../menu-item";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = (props: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  //User menu is a dropdown menu that appears when the user clicks on the user icon in the navbar.
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleOpen = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = React.useCallback(() => {
    if (!props.currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [props.currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100" onClick={onRent}>
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={props.currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {props.currentUser ? (
              <>
                <MenuItem onClick={() => router.push("/trips")} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
