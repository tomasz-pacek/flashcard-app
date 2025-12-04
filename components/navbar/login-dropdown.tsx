"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

export default function LoginDropdown() {
  const { user, session, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-10 rounded-full border" />
      ) : !session ? (
        <Button
          asChild
          className="border-2 border-foreground shadow-right-bottom transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 rounded-full"
        >
          <Link href="/login">Login</Link>
        </Button>
      ) : (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar className="flex items-center justify-center">
              {user?.image && <AvatarImage src={user?.image} />}
              <AvatarFallback className="border-2 border-foreground">
                <User2 />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={12}>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild></DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
