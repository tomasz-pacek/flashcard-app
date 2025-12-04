"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast, Toaster } from "sonner";

function ErrorToastContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "not_authenticated") toast.error("You must be logged in.");
    if (error === "already_authenticated")
      toast.error("You are already logged in.");
  }, [searchParams]);

  return null;
}

export default function GlobalErrorToasts() {
  return (
    <>
      <Suspense fallback={null}>
        <ErrorToastContent />
      </Suspense>
      <Toaster
        position="bottom-right"
        closeButton
        toastOptions={{
          unstyled: true,
          className:
            "border border-foreground shadow-right-bottom rounded-full flex items-center justify-center gap-x-2",
        }}
      />
    </>
  );
}
