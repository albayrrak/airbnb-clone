"use client";
import React from "react";
import { IconType } from "react-icons";
import cn from "classnames";
type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};
const Button = (props: ButtonProps) => {
  const { icon: Icon } = props;

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${props.outline ? "bg-white" : "bg-rose-500"}
        ${props.outline ? "border-black" : "border-rose-500"}
        ${props.outline ? "text-black" : "text-white"}
        ${props.small ? "text-sm" : "text-md"}
        ${props.small ? "py-1" : "py-3"}
        ${props.small ? "font-light" : "font-semibold"}
        ${props.small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={20} />}
      {props.label}
    </button>
  );
};

export default Button;
