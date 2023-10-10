"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
type CalendarProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};
const Calendar = (props: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[props.value]}
      date={new Date()}
      onChange={props.onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={props.disabledDates}
    />
  );
};

export default Calendar;
