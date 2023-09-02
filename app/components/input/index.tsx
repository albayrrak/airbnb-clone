"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import cn from "classnames";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = (props: InputProps) => {
  return (
    <div className="w-full relative">
      {props.formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={props.id}
        disabled={props.disabled}
        {...props.register(props.id, { required: props.required })}
        type={props.type}
        placeholder=""
        className={cn(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          {
            "pl-9": props.formatPrice,
            "pl-4": !props.formatPrice,
            "border-rose-500": props.errors[props.id],
            "focus:border-rose-500": props.errors[props.id],
            "border-neutral-300": !props.errors[props.id],
            "focus:border-black": !props.errors[props.id],
          }
        )}
      />
      <label
        className={cn(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ",
          {
            "left-9": props.formatPrice,
            "left-4": !props.formatPrice,
            "text-rose-500": props.errors[props.id],
            "text-zinc-400": !props.errors[props.id],
          }
        )}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
