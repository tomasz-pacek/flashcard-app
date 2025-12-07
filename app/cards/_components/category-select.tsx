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
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {flashcardCategories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
