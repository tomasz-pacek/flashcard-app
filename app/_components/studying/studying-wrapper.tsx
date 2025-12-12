"use client";

import FlashcardClient from "./flashcard-client";
import { Flashcard } from "@/types/flashcard";
import StudyingFooter from "../studying-footer";
import ProgressButtons from "./progress-buttons";
import { useState, useTransition } from "react";
import { resetFlashcardProgress } from "@/actions/resetFlashcardProgress";
import { toast } from "sonner";
import { increaseFlashcardProgress } from "@/actions/increaseFlashcardProgress";

type Props = {
  flashcards: Flashcard[];
};

export default function StudyingWrapper({ flashcards }: Props) {
  const [index, setIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const totalLength = flashcards.length;
  const currentCard = flashcards[index];

  const isCurrentFlashcardMastered = currentCard.isMastered;

  const handleNextCard = () => {
    if (index < totalLength - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const handlePreviousCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const resetProgress = () => {
    startTransition(async () => {
      try {
        await resetFlashcardProgress(currentCard.id);
      } catch (error) {
        toast("Failed to reset flashcard progress");
      }
    });
  };

  const increaseProgress = () => {
    startTransition(async () => {
      try {
        await increaseFlashcardProgress(currentCard.id);
        handleNextCard();
      } catch (error) {
        toast("Failed to increase card progress");
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-6">
      <FlashcardClient
        currentCard={currentCard}
        showAnswer={showAnswer}
        toggleAnswer={toggleAnswer}
      />
      <ProgressButtons
        isCurrentFlashcardMastered={isCurrentFlashcardMastered}
        isPending={isPending}
        resetProgress={resetProgress}
        increaseProgress={increaseProgress}
      />
      <StudyingFooter
        handleNextCard={handleNextCard}
        handlePreviousCard={handlePreviousCard}
        currentCardIndex={index}
        flashcardsLength={flashcards.length}
      />
    </div>
  );
}
