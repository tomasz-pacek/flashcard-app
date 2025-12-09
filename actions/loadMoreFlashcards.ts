"use server";

import { prisma } from "@/lib/prisma";

export const loadMoreFlashcards = async (skip: number, userId: string) => {
  const LIMIT = 12;

  if (!userId) return { flashcards: [], hasMore: false };

  const flashcards = await prisma.flashcard.findMany({
    where: { userId },
    skip,
    take: LIMIT,
    include: { category: true },
  });

  return {
    flashcards,
    hasMore: flashcards.length === LIMIT,
  };
};
