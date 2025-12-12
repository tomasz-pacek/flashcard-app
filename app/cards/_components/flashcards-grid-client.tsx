"use client";

import FlashcardSettings from "./flashcard-settings";
import { Flashcard } from "@/types/flashcard";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "@/components/submit-button";
import { useTransition } from "react";
import ProgressBar from "@/components/progress-bar";
import { motion, Variants, easeOut, AnimatePresence } from "motion/react";

type Props = {
  flashcards: Flashcard[];
  hasMore: boolean;
  currentPage: number;
};

export default function FlashcardsGridClient({
  flashcards,
  hasMore,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = 12;
  const [isPending, startTransition] = useTransition();

  const visibleCards = flashcards.slice(0, pageSize * currentPage);

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const page = params.get("page") ? parseInt(params.get("page")!) : 1;

    params.set("page", (page + 1).toString());

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {visibleCards.length > 0 ? (
          visibleCards.map((flashcard, i) => (
            <motion.div
              key={flashcard.id}
              className="w-full min-h-[260px] border-2 border-foreground rounded-2xl shadow-right-bottom bg-white flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: easeOut, delay: i * 0.05 }}
              layout
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

              <div className="w-full flex items-center justify-around gap-x-2 border-t-2 border-foreground p-4 mt-auto">
                <div className="text-xs font-medium rounded-full leading-[1.3rem] tracking-[-3%] border-2 border-foreground shadow-right-bottom px-3 py-1">
                  {flashcard.category.category}
                </div>
                <div className="flex flex-1">
                  <ProgressBar current={flashcard.progress} max={5} />
                </div>
                <div className="flex items-center">
                  <FlashcardSettings flashcardId={flashcard.id} />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-y-2 col-span-full">
            <p className="font-semibold text-2xl">No cards yet</p>
            <p className="leading-[1.4rem] text-base text-center">
              Add your first card using the form above and it will show up here.
            </p>
          </div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div className="w-full col-span-full flex items-center justify-center mt-4">
          <SubmitButton
            text="Load more"
            className="cursor-pointer  rounded-full border-foreground border-2 shadow-right-bottom transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            onClick={handleLoadMore}
            submittingText="Loading..."
            isSubmitting={isPending}
          />
        </div>
      )}
    </motion.div>
  );
}
