import { Spinner } from "../ui/spinner";

export default function FlashcardsSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Spinner className="size-12" />
    </div>
  );
}
