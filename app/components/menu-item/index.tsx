"use client";
import React from "react";

type MenuItemProps = {
  onClick: () => void;
  label: string;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={props.onClick}>
      {props.label}
    </div>
  );
};

export default MenuItem;
