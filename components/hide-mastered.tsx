"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";

export default function HideMastered() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hideMastered = searchParams.get("hideMastered") === "true";

  const toggleHideMastered = (checked: boolean) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        params.set("hideMastered", "true");
      } else {
        params.delete("hideMastered");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <label
      htmlFor="hide-mastered"
      className="flex items-center justify-center gap-x-2 cursor-pointer select-none"
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-x-2">
          <Spinner />
          <span className="text-base font-medium">Hiding...</span>
        </div>
      ) : (
        <>
          <Checkbox
            checked={hideMastered}
            onCheckedChange={(value) => toggleHideMastered(Boolean(value))}
            id="hide-mastered"
            className="border border-foreground"
          />
          <span className="text-base font-medium">Hide mastered</span>
        </>
      )}
    </label>
  );
}
