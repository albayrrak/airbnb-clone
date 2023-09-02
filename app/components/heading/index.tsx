import React from "react";
import cn from "classnames";
type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const Heading = (props: HeadingProps) => {
  return (
    <div
      className={cn({
        "text-center": props.center,
      })}
    >
      <div className="text-2xl font-bold">{props.title}</div>
      <div className="font-light text-neutral-500 mt-2">{props.subtitle}</div>
    </div>
  );
};

export default Heading;
