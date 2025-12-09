"use server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteFlashcard = async (flashcardId: string, userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return { status: false, message: "Forbidden" };

    if (currentUser.id === userId) {
      await prisma.flashcard.delete({
        where: {
          userId,
          id: flashcardId,
        },
      });
      revalidatePath("/cards");
      return {
        status: true,
        message: "Card deleted.",
      };
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error deleting flashcard";
    return { status: false, message };
  }
};
