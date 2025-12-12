"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const resetFlashcardProgress = async (flashcardId: string) => {
  await prisma.flashcard.update({
    where: {
      id: flashcardId,
    },
    data: {
      progress: 0,
      isMastered: false,
    },
  });

  revalidatePath("/");
};
