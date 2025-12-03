import { Route } from "next";
import Link from "next/link";

type Props = {
  text: string;
  url: Route;
  urlText: string;
};

export default function NewHere({ text, url, urlText }: Props) {
  return (
    <div className="w-full mt-4 text-center text-sm font-medium">
      {text}{" "}
      <Link className="text-secondary" href={url}>
        {urlText}
      </Link>
    </div>
  );
}
