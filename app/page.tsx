import { getCategoriesWithCount } from "@/actions/getCategoriesWithCount";
import CategoriesCheckbox from "@/components/categories-checkbox";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-utils";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const categories = await getCategoriesWithCount(currentUser.id);
  return (
    <div className="w-full grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-6 ">
      <div className="w-full border-2 border-foreground shadow-right-bottom rounded-2xl bg-white">
        <div className="w-full rounded-t-2xl border-b-2 border-foreground p-6">
          <CategoriesCheckbox categories={categories} />
        </div>
        <div className="w-full flex flex-col items-center justify-center my-6 gap-y-6">
          <p className="text-2xl font-semibold">No cards to study</p>
          <p className="text-base leading-[1.4rem] text-muted-foreground text-center ">
            You don&apos;t have any cards yet. Add your first card in the <br />
            All Cards tab.
          </p>
          <Button
            className="cursor-pointer rounded-full text-base bg-white border-2 border-foreground shadow-right-bottom px-5 py-3 transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            asChild
          >
            <Link href="/cards">Go to All Cards</Link>
          </Button>
        </div>
      </div>
      <div className="border-2 border-foreground bg-white rounded-xl shadow-right-bottom">
        hej
      </div>
    </div>
  );
}
