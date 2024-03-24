"use client";

import { useEffect } from "react";
import Popup from "~/components/popup";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Popup
      message={error.message}
      type="error"
      onClose={() => reset()}
      buttonMsg="Retry"
    />
  );
}
