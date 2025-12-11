import { Spinner } from "../ui/spinner";

export default function EditFormSkeleton() {
  return (
    <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 mb-12">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-64 bg-white shadow-right-bottom border-2 border-foreground flex items-center justify-center rounded-2xl"
        >
          <Spinner className="size-12" />
        </div>
      ))}
    </div>
  );
}
