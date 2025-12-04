"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarNavigation() {
  const pathname = usePathname();
  const activeStyles = "border-foreground bg-primary";

  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-3 shadow-right-bottom border-2 border-foreground rounded-full p-1">
      <Link
        href="/"
        className={`rounded-full px-4 py-3 font-semibold border-2 max-sm:text-sm whitespace-nowrap ${
          pathname === "/" ? activeStyles : "border-transparent"
        }`}
      >
        Study Mode
      </Link>
      <Link
        href="/cards"
        className={`rounded-full px-4 py-3 font-semibold border-2 max-sm:text-sm whitespace-nowrap ${
          pathname === "/cards" ? activeStyles : "border-transparent"
        }`}
      >
        All Cards
      </Link>
    </div>
  );
}
