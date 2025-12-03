"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast, Toaster } from "sonner";

function ErrorToastContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "no_payment_access") toast.error("Verify your profile!");
    if (error === "not_verified") toast.error("Verify your profile!");
    if (error === "not_authenticated") toast.error("You must be logged in!");
    if (error === "already_authenticated")
      toast.error("You are already logged in!");
    if (error === "wrong_file") toast.error("Wrong file");
  }, [searchParams]);

  return null;
}

export default function GlobalErrorToasts() {
  return (
    <>
      <Suspense fallback={null}>
        <ErrorToastContent />
      </Suspense>
      <Toaster position="top-right" closeButton />
    </>
  );
}
