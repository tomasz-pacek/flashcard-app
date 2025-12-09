import { Category } from "./category";

export type Flashcard = {
  id: string;
  userId: string;
  question: string;
  answer: string;
  isMastered: boolean;
  progress: number;
  categoryId: string;
  category: Category;
};
