import { prisma } from "@/lib/prisma";
import FlashcardsGridClient from "./flashcards-grid-client";

type Props = {
  searchParamsPromise: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  userId: string;
};

export default async function FlashcardsLoader({
  searchParamsPromise,
  userId,
}: Props) {
  const searchParams = await searchParamsPromise;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const pageSize = 12;
  const hideMastered = searchParams.hideMastered === "true";
  const categories = searchParams.category;

  const where: {
    userId: string;
    isMastered?: boolean;
    categoryId?: { in: string[] };
  } = {
    userId,
  };

  if (hideMastered) {
    where.isMastered = false;
  }

  if (categories) {
    const categoryIds = Array.isArray(categories) ? categories : [categories];
    where.categoryId = { in: categoryIds };
  }

  const [flashcards, totalCount] = await Promise.all([
    prisma.flashcard.findMany({
      where,
      include: { category: true },
      take: pageSize * page,
    }),
    prisma.flashcard.count({ where: { userId } }),
  ]);

  const hasMore = page * pageSize < totalCount;

  return (
    <FlashcardsGridClient
      flashcards={flashcards}
      hasMore={hasMore}
      currentPage={page}
    />
  );
}
