"use server";

import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const editFlashcard = async (
  flashcardId: string,
  userId: string,
  values: {
    question: string;
    answer: string;
    categoryId: string;
  }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (userId !== currentUser?.id)
      return { status: false, message: "Forbidden" };

    const { question, answer, categoryId } = values;
    if (!categoryId)
      return { status: false, message: "You have to choose category" };

    await prisma.flashcard.update({
      where: {
        id: flashcardId,
      },
      data: {
        answer,
        question,
        categoryId,
      },
    });
    revalidatePath("/cards");
    return { status: true, message: "Card updated successfully" };
  } catch (error) {
    return { status: false, message: "Error editing card" };
  }
};
