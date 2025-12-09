"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category";

type Props = {
  flashcardCategories: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function CategorySelect({
  flashcardCategories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full text-foreground font-medium border-2 border-foreground ">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent className="border-2 border-foreground shadow-right-bottom p-0 divide-y">
        {flashcardCategories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
            className="cursor-pointer hover:bg-background text-foreground font-medium bg-white"
          >
            {category.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
