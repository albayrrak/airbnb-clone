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
      className={cn(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-rose-500 py-3 text-md font-semibold border-2",
        {
          "bg-white": props.outline,
          "border-black": props.outline,
          "text-black": props.outline,
          "border-rose-500": !props.outline,
          "text-white": !props.outline,
          "py-1": props.small,
          "text-sm": props.small,
          "font-light": props.small,
          "border-[1px]": props.small,
        }
      )}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={20} />}
      {props.label}
    </button>
  );
};

export default Button;
