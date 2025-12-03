"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginDropdown() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {!user ? (
        <Button
          className="cursor-pointer border-2 border-foreground shadow-right-bottom transition-all ease-out duration-200  hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 "
          asChild
        >
          <Link href="/login">Log in</Link>
        </Button>
      ) : (
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
}
