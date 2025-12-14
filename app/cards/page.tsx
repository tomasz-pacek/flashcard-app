import { FlashcardCategoriesProvider } from "@/contexts/flashcards-categories-provider";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import FilterWrapper from "./_components/filters/filter-wrapper";
import { Suspense } from "react";
import FlashcardsLoader from "./_components/flashcards-loader";
import { CardContent } from "@/components/ui/card";
import CreateNewCategoryForm from "./_components/create-new-category-form";
import CreateCardForm from "./_components/create-card-form";
import FlashcardsSkeleton from "@/components/skeletons/flashcards-skeleton";
import DeleteFlashcardDialog from "./_components/delete-flashcard-dialog";
import EditFlashcardDialog from "./_components/edit-flashcard-dialog";
import { Metadata } from "next";
import MotionCard from "./_components/motion-card";

export const metadata: Metadata = {
  title: "All Cards",
  description:
    "Create and manage your flashcards. Build custom card sets, edit content, and organize your learning material.",
  alternates: {
    canonical: "https://localhost:3000/cards",
  },
};

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function CardsPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/?error=not_authenticated");

  const flashcardCategories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  return (
    <FlashcardCategoriesProvider categories={flashcardCategories}>
      <div className="w-full grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 gap-6">
        {/* CATEGORY CREATOR */}
        <MotionCard
          className="shadow-right-bottom border-2 border-foreground h-full"
          motionProps={{
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3 },
          }}
        >
          <CardContent>
            <CreateNewCategoryForm />
          </CardContent>
        </MotionCard>
        {/* FLASHCARD CREATOR */}
        <MotionCard
          className="shadow-right-bottom border-2 border-foreground"
          motionProps={{
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4 },
          }}
        >
          <CardContent>
            <CreateCardForm flashcardCategories={flashcardCategories} />
          </CardContent>
        </MotionCard>
      </div>
      <FilterWrapper />
      <Suspense fallback={<FlashcardsSkeleton />}>
        <FlashcardsLoader searchParamsPromise={searchParams} userId={user.id} />
      </Suspense>
      {/* DIALOGs */}
      <DeleteFlashcardDialog />
      <EditFlashcardDialog />
    </FlashcardCategoriesProvider>
  );
}
