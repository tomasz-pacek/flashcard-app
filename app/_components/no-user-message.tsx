import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoUserMessage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-6">
      <p className="text-2xl font-semibold">Log in</p>
      <p className="text-base leading-[1.4rem] text-muted-foreground text-center">
        You don&apos;t have any cards yet. Login or create an account <br /> and
        make your own flashcards
      </p>

      <Button
        className="cursor-pointer rounded-full text-base bg-white border-2 border-foreground shadow-right-bottom px-5 py-3 transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        asChild
      >
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
