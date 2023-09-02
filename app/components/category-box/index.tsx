"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import cn from "classnames";
import { IconType } from "react-icons";

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};
const CategoryBox = (props: CategoryBoxProps) => {
  const { icon: Icon } = props;
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: props.label,
    };

    if (params?.get("category") === props.label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );
    console.log(url);

    router.push(url);
  }, [props.label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        {
          "border-b-neutral-800": props.selected,
          "text-neutral-800": props.selected,
          "text-neutral-500": !props.selected,
          "border-transparent": !props.selected,
        }
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{props.label}</div>
    </div>
  );
};

export default CategoryBox;
