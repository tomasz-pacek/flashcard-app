"use client";

import ProgressBar from "@/components/progress-bar";
import { Flashcard } from "@/types/flashcard";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  currentCard: Flashcard;
  showAnswer: boolean;
  toggleAnswer: () => void;
};

export default function FlashcardClient({
  currentCard,
  showAnswer,
  toggleAnswer,
}: Props) {
  return (
    <div className="w-full p-5">
      <div
        onClick={toggleAnswer}
        className={`w-full min-h-24 rounded-2xl border-2 border-foreground shadow-right-bottom flex flex-col items-center justify-center py-6 gap-y-24 transition-all duration-300 cursor-pointer relative ${
          showAnswer ? "bg-chart-1" : "bg-chart-4"
        }`}
      >
        {/* CATEGORY BADGE */}
        <div className="text-xs font-medium rounded-full leading-[1.3rem] tracking-[-3%] border-2 border-foreground shadow-right-bottom px-3 py-1 bg-white">
          {currentCard.category.category}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={showAnswer ? "answer" : "question"}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -5 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.1 }}
              className="font-bold text-[2.5rem] text-center transition-all duration-300"
            >
              {showAnswer ? currentCard.answer : currentCard.question}
            </motion.p>
          </AnimatePresence>
          <p className="text-base font-medium text-foreground/80 text-center">
            Click to reveal the answer
          </p>
        </div>
        <ProgressBar current={currentCard.progress} max={5} />
        {/* PATTERNS */}
        {/* RIGHT TOP */}
        <div
          className={`absolute transition-all duration-300 ${
            showAnswer
              ? "text-chart-3 right-16 top-12 -rotate-12"
              : "text-chart-1 top-6 right-8 rotate-24"
          }`}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: "var(--foreground)" }}
          >
            <path
              d="M11.125 1.90723C11.4923 1.1975 12.5077 1.1975 12.875 1.90723L16.1035 8.15234C16.2685 8.47136 16.5286 8.73147 16.8477 8.89648L23.0928 12.125C23.8025 12.4923 23.8025 13.5077 23.0928 13.875L16.8477 17.1035C16.5286 17.2685 16.2685 17.5286 16.1035 17.8477L12.875 24.0928C12.5077 24.8025 11.4923 24.8025 11.125 24.0928L7.89648 17.8477C7.73147 17.5286 7.47136 17.2685 7.15234 17.1035L0.907227 13.875C0.197502 13.5077 0.1975 12.4923 0.907227 12.125L7.15234 8.89648C7.47137 8.73146 7.73146 8.47137 7.89648 8.15234L11.125 1.90723Z"
              strokeWidth={0.75}
            />
            <path
              d="M11.125 0.907227C11.4923 0.1975 12.5077 0.197502 12.875 0.907227L16.1035 7.15234C16.2685 7.47136 16.5286 7.73147 16.8477 7.89648L23.0928 11.125C23.8025 11.4923 23.8025 12.5077 23.0928 12.875L16.8477 16.1035C16.5286 16.2685 16.2685 16.5286 16.1035 16.8477L12.875 23.0928C12.5077 23.8025 11.4923 23.8025 11.125 23.0928L7.89648 16.8477C7.73147 16.5286 7.47136 16.2685 7.15234 16.1035L0.907227 12.875C0.197502 12.5077 0.1975 11.4923 0.907227 11.125L7.15234 7.89648C7.47137 7.73146 7.73146 7.47137 7.89648 7.15234L11.125 0.907227Z"
              strokeWidth={0.75}
            />
          </svg>
        </div>
        <div
          className={`absolute transition-all duration-300 ${
            showAnswer
              ? "text-chart-2 bottom-24 left-10 -rotate-16"
              : "text-primary bottom-10 left-16 rotate-12"
          }`}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: "var(--foreground)" }}
          >
            <path
              d="M11.125 1.90723C11.4923 1.1975 12.5077 1.1975 12.875 1.90723L16.1035 8.15234C16.2685 8.47136 16.5286 8.73147 16.8477 8.89648L23.0928 12.125C23.8025 12.4923 23.8025 13.5077 23.0928 13.875L16.8477 17.1035C16.5286 17.2685 16.2685 17.5286 16.1035 17.8477L12.875 24.0928C12.5077 24.8025 11.4923 24.8025 11.125 24.0928L7.89648 17.8477C7.73147 17.5286 7.47136 17.2685 7.15234 17.1035L0.907227 13.875C0.197502 13.5077 0.1975 12.4923 0.907227 12.125L7.15234 8.89648C7.47137 8.73146 7.73146 8.47137 7.89648 8.15234L11.125 1.90723Z"
              strokeWidth={0.75}
            />
            <path
              d="M11.125 0.907227C11.4923 0.1975 12.5077 0.197502 12.875 0.907227L16.1035 7.15234C16.2685 7.47136 16.5286 7.73147 16.8477 7.89648L23.0928 11.125C23.8025 11.4923 23.8025 12.5077 23.0928 12.875L16.8477 16.1035C16.5286 16.2685 16.2685 16.5286 16.1035 16.8477L12.875 23.0928C12.5077 23.8025 11.4923 23.8025 11.125 23.0928L7.89648 16.8477C7.73147 16.5286 7.47136 16.2685 7.15234 16.1035L0.907227 12.875C0.197502 12.5077 0.1975 11.4923 0.907227 11.125L7.15234 7.89648C7.47137 7.73146 7.73146 7.47137 7.89648 7.15234L11.125 0.907227Z"
              strokeWidth={0.75}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
