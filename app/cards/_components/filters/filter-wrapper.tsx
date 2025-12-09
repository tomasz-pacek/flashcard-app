import CategoriesCheckbox from "@/components/categories-checkbox";
import HideMastered from "@/components/hide-mastered";

export default function FilterWrapper() {
  return (
    <div className="w-full flex items-center justify-between mt-8 mb-6">
      <span className="flex items-center justify-center gap-x-4">
        <CategoriesCheckbox />
        <HideMastered />
      </span>
    </div>
  );
}
