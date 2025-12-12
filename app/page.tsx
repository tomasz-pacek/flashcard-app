import { getCategoriesWithCount } from "@/actions/getCategoriesWithCount";
import { getCurrentUser } from "@/lib/auth-utils";
import StatisticsWrapper from "./_components/study-statictics/statistics-wrapper";
import EmptyMessage from "./_components/empty-message";
import StudyingFilters from "./_components/studying-filters";
import { prisma } from "@/lib/prisma";
import StudyingWrapper from "./_components/studying/studying-wrapper";
import AllMasteredMessage from "./_components/all-mastered-message";
import NoUserMessage from "./_components/no-user-message";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  const params = await searchParams;

  const hideMastered = params.hideMastered === "true";
  const paramsCategories = params.category;

  const where: {
    userId?: string;
    isMastered?: boolean;
    categoryId?: { in: string[] };
  } = {};

  if (currentUser) {
    where.userId = currentUser.id;
    if (hideMastered) where.isMastered = false;
    if (paramsCategories) {
      const categoryIds = Array.isArray(paramsCategories)
        ? paramsCategories
        : [paramsCategories];
      where.categoryId = { in: categoryIds };
    }
  }

  const [categories, flashcards] = await Promise.all([
    currentUser ? getCategoriesWithCount(currentUser.id) : [],
    currentUser
      ? prisma.flashcard.findMany({
          where,
          include: { category: true },
          orderBy: { id: "asc" },
        })
      : [],
  ]);

  const allMastered = currentUser
    ? flashcards.length === 0 && hideMastered
    : false;

  return (
    <div className="w-full grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-6">
      <div className="w-full border-2 border-foreground shadow-right-bottom rounded-2xl bg-white flex flex-col">
        <StudyingFilters categories={categories} />
        {currentUser ? (
          allMastered ? (
            <AllMasteredMessage />
          ) : flashcards.length > 0 ? (
            <StudyingWrapper flashcards={flashcards} />
          ) : (
            <EmptyMessage />
          )
        ) : (
          <NoUserMessage />
        )}
      </div>
      <StatisticsWrapper />
    </div>
  );
}
