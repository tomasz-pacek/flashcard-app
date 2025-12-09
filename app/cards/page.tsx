import { Card, CardContent } from "@/components/ui/card";
import CreateCardForm from "./_components/create-card-form";
import { getCurrentUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import CreateNewCategoryForm from "./_components/create-new-category-form";
import { prisma } from "@/lib/prisma";
import FlashcardsGrid from "./_components/flashcards-grid";
import { FlashcardCategoriesProvider } from "@/contexts/flashcards-categories-provider";
import FilterWrapper from "./_components/filters/filter-wrapper";

export default async function CardsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/?error=not_authenticated");

  const flashcardCategories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <FlashcardCategoriesProvider categories={flashcardCategories}>
      {/* GRID */}
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
      <FlashcardsGrid />
    </FlashcardCategoriesProvider>
  );
}
