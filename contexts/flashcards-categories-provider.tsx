"use client";

import { Category } from "@/types/category";
import { createContext, useContext } from "react";

const FlashcardCategoriesContext = createContext<Category[]>([]);

export function FlashcardCategoriesProvider({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) {
  return (
    <FlashcardCategoriesContext.Provider value={categories}>
      {children}
    </FlashcardCategoriesContext.Provider>
  );
}

export function useFlashcardCategories() {
  return useContext(FlashcardCategoriesContext);
}
