"use client";

import { Checkbox } from "./ui/checkbox";

export default function HideMastered() {
  return (
    <label
      htmlFor="hide-mastered"
      className="flex items-center justify-center gap-x-2 cursor-pointer select-none"
    >
      <Checkbox id="hide-mastered" className="border border-foreground" />
      <span className="text-base font-medium">Hide mastered</span>
    </label>
  );
}
