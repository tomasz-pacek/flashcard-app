"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const increaseFlashcardProgress = async (flashcardId: string) => {
  const flashcard = await prisma.flashcard.findUnique({
    where: {
      id: flashcardId,
    },
    select: {
      progress: true,
    },
  });

  if (!flashcard) return;

  const newProgress = Math.min(flashcard.progress + 1, 5);

  await prisma.flashcard.update({
    where: {
      id: flashcardId,
    },
    data: {
      progress: newProgress,
      isMastered: newProgress === 5 ? true : false,
    },
  });

  revalidatePath("/");
};
