import CategoriesCheckbox from "@/components/categories-checkbox";
import HideMastered from "@/components/hide-mastered";
import { CategoryWithCount } from "@/types/category";

type Props = {
  categories: CategoryWithCount[];
};

export default function StudyingFilters({ categories }: Props) {
  return (
    <div className="w-full rounded-t-2xl border-b-2 border-foreground flex items-center justify-start gap-x-4 h-24 p-5">
      <CategoriesCheckbox categories={categories} />
      <HideMastered />
    </div>
  );
}
