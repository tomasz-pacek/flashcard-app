import { getCategoriesWithCount } from "@/actions/getCategoriesWithCount";
import CategoriesCheckbox from "@/components/categories-checkbox";
import HideMastered from "@/components/hide-mastered";
import { getCurrentUser } from "@/lib/auth-utils";

export default async function FilterWrapper() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const categories = await getCategoriesWithCount(currentUser.id);
  return (
    <div className="w-full flex items-center justify-between mt-8 mb-6">
      <span className="flex items-center justify-center gap-x-4">
        <CategoriesCheckbox categories={categories} />
        <HideMastered />
      </span>
    </div>
  );
}
