export type Category = {
  id: string;
  userId: string;
  category: string;
};

export type CategoryWithCount = {
  id: string;
  userId: string;
  category: string;
  _count: {
    flashcard: number;
  };
};
