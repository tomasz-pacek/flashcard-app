"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLoginButton() {
  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Button
      onClick={googleSignIn}
      type="button"
      className="bg-white border-2 border-foreground shadow-right-bottom w-full mt-6 cursor-pointer transition-all duration-200 ease-out hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
    >
      <FaGoogle />
      Google
    </Button>
  );
}
