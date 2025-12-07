import { Category } from "./category";

export type Flashcard = {
  id: string;
  userId: string;
  question: string;
  answer: string;
  categoryId: string;
  category: Category[];
};
