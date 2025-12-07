import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

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

  return (
    <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 my-12">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          className="w-full min-h-[260px] border-2 border-foreground rounded-2xl shadow-right-bottom bg-white flex flex-col"
        >
          <p className="text-xl font-semibold p-4 border-b-2 border-foreground h-[72px] overflow-hidden line-clamp-2">
            {flashcard.question}
          </p>

          <div className="w-full p-4 flex flex-col items-start justify-start grow">
            <p className="text-sm leading-[1.4rem] font-medium text-muted-foreground">
              Answer:
            </p>
            <p className="font-medium text-sm leading-[1.4rem]">
              {flashcard.answer}
            </p>
          </div>

          <div className="w-full flex items-center justify-center border-t-2 border-foreground py-4 mt-auto">
            <div className="text-xs font-medium rounded-full leading-[1.3rem] tracking-[-3%] border-2 border-foreground shadow-right-bottom px-3 py-1">
              {flashcard.category.category}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
