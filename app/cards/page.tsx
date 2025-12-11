import { FlashcardCategoriesProvider } from "@/contexts/flashcards-categories-provider";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import FilterWrapper from "./_components/filters/filter-wrapper";
import { Suspense } from "react";
import FlashcardsLoader from "./_components/flashcards-loader";
import { Card, CardContent } from "@/components/ui/card";
import CreateNewCategoryForm from "./_components/create-new-category-form";
import CreateCardForm from "./_components/create-card-form";
import FlashcardsSkeleton from "@/components/skeletons/flashcards-skeleton";
import DeleteFlashcardDialog from "./_components/delete-flashcard-dialog";
import EditFlashcardDialog from "./_components/edit-flashcard-dialog";

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
        <Card className="shadow-right-bottom border-2 border-foreground">
          <CardContent>
            <CreateNewCategoryForm />
          </CardContent>
        </Card>
        {/* FLASHCARD CREATOR */}
        <Card className="shadow-right-bottom border-2 border-foreground">
          <CardContent>
            <CreateCardForm flashcardCategories={flashcardCategories} />
          </CardContent>
        </Card>
      </div>
      <FilterWrapper />
      <Suspense fallback={<FlashcardsSkeleton />}>
        <FlashcardsLoader searchParamsPromise={searchParams} userId={user.id} />
      </Suspense>
      <DeleteFlashcardDialog />
      <EditFlashcardDialog />
    </FlashcardCategoriesProvider>
  );
}
