type Props = {
  text: string;
  count: string;
  background: string;
  children: React.ReactNode;
};

export default function StatisticCard({
  text,
  count,
  background,
  children,
}: Props) {
  return (
    <div className="w-full h-32 border-2 border-foreground shadow-right-bottom rounded-[0.75rem] flex items-center justify-between">
      <div className="flex flex-col items-start justify-center p-5">
        <p className="font-medium text-base">{text}</p>
        <p className="font-bold text-[2.5rem]">{count}</p>
      </div>
      <div
        className={`text-foreground h-full rounded-r-[0.75rem] flex items-center justify-center border-l-2 border-foreground min-w-24 ${background}`}
      >
        {children}
      </div>
    </div>
  );
}
