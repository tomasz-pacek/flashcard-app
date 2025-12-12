"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, RotateCcw } from "lucide-react";

type Props = {
  isCurrentFlashcardMastered: boolean;
  isPending: boolean;
  resetProgress: () => void;
  increaseProgress: () => void;
};

export default function ProgressButtons({
  isCurrentFlashcardMastered,
  isPending,
  resetProgress,
  increaseProgress,
}: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-x-4 gap-y-3 max-sm:flex-col ">
      <Button
        onClick={increaseProgress}
        disabled={isPending || isCurrentFlashcardMastered}
        className="border-2 border-foreground cursor-pointer shadow-right-bottom transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 rounded-full font-medium text-base max-sm:w-full"
      >
        <BadgeCheck />
        {isCurrentFlashcardMastered ? "Already Mastered" : "I Know This"}
      </Button>
      <Button
        onClick={resetProgress}
        disabled={isPending}
        className="border-2 border-foreground bg-white rounded-full text-base font-medium cursor-pointer shadow-right-bottom transition-all duration-200 hover:shadow-none hover:bg-white hover:translate-x-0.5 hover:translate-y-0.5 max-sm:w-full"
      >
        <RotateCcw />
        Reset Progress
      </Button>
    </div>
  );
}
