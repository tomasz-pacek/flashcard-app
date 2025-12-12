export default function AllMasteredMessage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-2">
      <p className="text-2xl font-semibold">You&apos;re all caught up!</p>
      <p className="text-base leading-[1.4rem] text-muted-foreground text-center">
        All your cards are mastered. Turn off “Hide mastered” to see them again.
      </p>
    </div>
  );
}
