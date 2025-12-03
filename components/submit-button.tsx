"use client";

import { Button } from "./ui/button";

type Props = {
  text: string;
  className: string;
  type?: "button" | "submit";
  submittingText?: string;
  isSubmitting?: boolean;
};

export default function SubmitButton({
  text,
  className,
  type = "submit",
  submittingText,
  isSubmitting,
}: Props) {
  return (
    <Button type={type} className={className} disabled={isSubmitting}>
      {isSubmitting ? submittingText : text}
    </Button>
  );
}
