"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/empty-state";

type ErrorStateProps = {
  error: Error;
};

const ErrorState = (props: ErrorStateProps) => {
  useEffect(() => {
    console.error(props.error);
  }, [props.error]);
  return <EmptyState title="Uh Oh" subtitle="Something  wrong!" />;
};

export default ErrorState;
