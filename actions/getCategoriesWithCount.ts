"use server";

import { prisma } from "@/lib/prisma";

export const getCategoriesWithCount = async (userId: string) => {
  const categoriesWithCount = await prisma.category.findMany({
    where: { userId },
    include: {
      _count: {
        select: { flashcard: true },
      },
    },
    orderBy: {
      category: "asc",
    },
  });

  return categoriesWithCount;
};
