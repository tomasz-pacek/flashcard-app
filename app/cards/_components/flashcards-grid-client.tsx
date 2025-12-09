"use client";

import { useState, useTransition } from "react";
import DeleteFlashcardDialog from "./delete-flashcard-dialog";
import EditFlashcardDialog from "./edit-flashcard-dialog";
import FlashcardSettings from "./flashcard-settings";
import { Flashcard } from "@/types/flashcard";
import { loadMoreFlashcards } from "@/actions/loadMoreFlashcards";
import SubmitButton from "@/components/submit-button";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  initialFlashcards: Flashcard[];
};

export default function FlashcardsGridClient({ initialFlashcards }: Props) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { user } = useAuth();
  if (!user) return null;

  const handleLoadMoreFlashcards = () => {
    startTransition(async () => {
      const { flashcards: more, hasMore: moreAvailable } =
        await loadMoreFlashcards(flashcards.length, user.id);

      if (!moreAvailable) {
        setHasMore(false);
      }

      setFlashcards((prev) => [...prev, ...more]);
    });
  };

  return (
    <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 mb-12">
      {flashcards.length > 0 ? (
        flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="w-full min-h-[260px] border-2 border-foreground rounded-2xl shadow-right-bottom bg-white flex flex-col"
          >
            <p className="text-xl font-semibold p-4 border-b-2 border-foreground h-[72px] overflow-hidden line-clamp-2">
              {flashcard.question}
            </p>

            <div className="w-full p-4 flex flex-col items-start justify-start grow">
              <p className="text-sm leading-[1.4rem] font-medium text-muted-foreground">
                Answer:
              </p>
              <p className="font-medium text-sm leading-[1.4rem]">
                {flashcard.answer}
              </p>
            </div>

            <div className="w-full flex items-center justify-around gap-x-2 border-t-2 border-foreground py-4 mt-auto">
              <div className="text-xs font-medium rounded-full leading-[1.3rem] tracking-[-3%] border-2 border-foreground shadow-right-bottom px-3 py-1">
                {flashcard.category.category}
              </div>

              <div className="flex items-center">
                <FlashcardSettings flashcardId={flashcard.id} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-y-2 col-span-full">
          <p className="font-semibold text-2xl">No cards yet</p>
          <p className="leading-[1.4rem] text-base text-center">
            Add your first card using the form above and it will show up here.
          </p>
        </div>
      )}
      {hasMore && (
        <div className="w-full col-span-full flex items-center justify-center">
          <SubmitButton
            text="Load More"
            className="cursor-pointer mt-4 rounded-full bg-white border-2 border-foreground shadow-right-bottom transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none hover:bg-white"
            isSubmitting={isPending}
            submittingText="Loading..."
            type="button"
            onClick={handleLoadMoreFlashcards}
          />
        </div>
      )}

      <DeleteFlashcardDialog />
      <EditFlashcardDialog />
    </div>
  );
}
