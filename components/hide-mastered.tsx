"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";

export default function HideMastered() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checked, setChecked] = useState<boolean>(
    searchParams.get("hideMastered") === "true"
  );

  useEffect(() => {
    setChecked(searchParams.get("hideMastered") === "true");
  }, [searchParams]);

  const toggleHideMastered = (value: boolean) => {
    setChecked(true);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("hideMastered", "true");
    } else {
      params.delete("hideMastered");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <label
      htmlFor="hide-mastered"
      className="flex items-center justify-center gap-x-2 cursor-pointer select-none"
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => toggleHideMastered(Boolean(value))}
        id="hide-mastered"
        className="border border-foreground"
      />
      <span className="text-base font-medium">Hide mastered</span>
    </label>
  );
}
