"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createFlashcard = async (
  question: string,
  answer: string,
  categoryId: string,
  userId: string
) => {
  try {
    const existingFlashcard = await prisma.flashcard.findFirst({
      where: {
        question,
        answer,
        categoryId,
        userId,
      },
    });

    if (!categoryId)
      return { status: false, message: "You have to choose category" };

    if (!existingFlashcard) {
      await prisma.flashcard.create({
        data: {
          question,
          answer,
          userId,
          categoryId,
        },
      });
      revalidatePath("/cards");
      return {
        status: true,
        message: "Card created successfully.",
      };
    } else {
      return { status: false, message: "The exact flashcard already exists" };
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error creating flashcard";
    return { status: false, message };
  }
};
