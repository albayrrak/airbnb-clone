"use client";

import React from "react";
import { IconType } from "react-icons";
import cn from "classnames";

type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

const CategoryInput = (props: CategoryInputProps) => {
  const { icon: Icon } = props;
  return (
    <div
      onClick={() => props.onClick(props.label)}
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        {
          "border-black": props.selected,
          "border-neutral-200": !props.selected,
        }
      )}
    >
      <Icon size={30} />
      <div className="font-semibold">{props.label}</div>
    </div>
  );
};

export default CategoryInput;
