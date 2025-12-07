"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCategory = async (category: string, userId: string) => {
  try {
    const exisitngCategory = await prisma.category.findFirst({
      where: {
        category,
      },
    });

    if (!exisitngCategory) {
      await prisma.category.create({
        data: {
          category,
          userId,
        },
      });
      revalidatePath("/cards");
      return {
        status: true,
        message: "Card category created.",
      };
    } else {
      return {
        status: false,
        message: "Flashcard category with this name already exists.",
      };
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error creating category";
    return { status: false, message };
  }
};
