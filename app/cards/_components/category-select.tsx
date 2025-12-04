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
};

export default function CategorySelect({ flashcardCategories }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {flashcardCategories.map((category) => (
          <SelectItem key={category.id} value={category.category}>
            {category.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
