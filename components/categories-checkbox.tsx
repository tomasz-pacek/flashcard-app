"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useFlashcardCategoriesWithCount } from "@/contexts/flashcards-categories-with-count-provider";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesCheckbox() {
  const categories = useFlashcardCategoriesWithCount();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();
    selectedCategories.forEach((c) => params.append("category", c));
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white border-2 border-foreground rounded-full py-2 px-4 flex gap-x-2 font-medium text-base">
        All Categories <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-2 border-foreground divide-y divide-foreground p-0">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center p-2 hover:bg-background cursor-pointer transition-all duration-200 text-foreground"
              onClick={() => toggleCategory(category.id)}
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                className="border border-foreground"
              />
              <div className="flex items-center justify-center gap-x-2 ml-2 text-sm leading-[1.4rem] font-medium">
                <span className="text-foreground">{category.category}</span>
                <span className="text-muted-foreground">
                  ({category._count.flashcard})
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">no categories to show</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
