import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import FlashcardsGridClient from "./flashcards-grid-client";

export default async function FlashcardsGrid() {
  const user = await getCurrentUser();
  if (!user) return null;

  const flashcards = await prisma.flashcard.findMany({
    where: { userId: user.id },
    include: {
      category: true,
    },
    take: 12,
  });

  return <FlashcardsGridClient initialFlashcards={flashcards} />;
}
