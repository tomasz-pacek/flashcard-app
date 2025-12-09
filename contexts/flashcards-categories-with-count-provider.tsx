"use client";

import { CategoryWithCount } from "@/types/category";
import { createContext, useContext } from "react";

const FlashcardCategoriesWithCountContext = createContext<CategoryWithCount[]>(
  []
);

export function FlashcardCategoriesWithCountProvider({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: CategoryWithCount[];
}) {
  return (
    <FlashcardCategoriesWithCountContext.Provider value={categories}>
      {children}
    </FlashcardCategoriesWithCountContext.Provider>
  );
}

export function useFlashcardCategoriesWithCount() {
  return useContext(FlashcardCategoriesWithCountContext);
}
