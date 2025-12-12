"use client";

import SubmitButton from "@/components/submit-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  handleNextCard: () => void;
  handlePreviousCard: () => void;
  currentCardIndex: number;
  flashcardsLength: number;
};

export default function StudyingFooter({
  handleNextCard,
  handlePreviousCard,
  currentCardIndex,
  flashcardsLength,
}: Props) {
  return (
    <div className="w-full h-24 border-t-2 border-foreground flex items-center justify-between px-5">
      <SubmitButton
        text="Previous"
        className="font-medium text-base rounded-full bg-white hover:bg-white border-2 border-foreground cursor-pointer py-5"
        type="button"
        textClassName="max-sm:hidden"
        onClick={handlePreviousCard}
      >
        <ChevronLeft className="size-5" />
      </SubmitButton>
      <p className="text-sm font-medium text-muted-foreground min-w-24">
        Card {currentCardIndex + 1} of {flashcardsLength}
      </p>
      <SubmitButton
        text="Next"
        className="font-medium text-base rounded-full bg-white hover:bg-white border-2 border-foreground cursor-pointer py-5 flex-row-reverse"
        type="button"
        textClassName="max-sm:hidden"
        onClick={handleNextCard}
      >
        <ChevronRight className="size-5" />
      </SubmitButton>
    </div>
  );
}
