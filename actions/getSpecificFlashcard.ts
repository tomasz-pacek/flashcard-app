"use server";

import { prisma } from "@/lib/prisma";

export const getSpecificFlashcard = async (
  flashcardId: string,
  userId: string
) => {
  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: {
        userId,
        id: flashcardId,
      },
      select: {
        question: true,
        answer: true,
        categoryId: true,
      },
    });

    if (!flashcard) {
      return {
        status: false,
        message: "Flashcard not found",
      };
    }

    return { status: true, flashcard };
  } catch (error) {
    return { status: false, message: "Error fetching flashcard data" };
  }
};
