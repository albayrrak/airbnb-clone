"use client";
import React from "react";
import Container from "../container";
import Logo from "../logo";
import Search from "../search";
import UserMenu from "../user-menu";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Categories from "../categories";

type NavbarProps = {
  currentUser?: SafeUser | null;
};

const Navbar = (props: NavbarProps) => {
  console.log(props.currentUser);

  return (
    <div className="fixed w-full z-10 bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={props.currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
