import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyMessage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-6">
      <p className="text-2xl font-semibold">No cards to study</p>
      <p className="text-base leading-[1.4rem] text-muted-foreground text-center">
        You don&apos;t have any cards yet. Add your first card in the <br />
        All Cards tab.
      </p>

      <Button
        className="cursor-pointer rounded-full text-base bg-white border-2 border-foreground shadow-right-bottom px-5 py-3 transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        asChild
      >
        <Link href="/cards">Go to All Cards</Link>
      </Button>
    </div>
  );
}
