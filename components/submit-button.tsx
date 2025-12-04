"use client";

import { Button } from "./ui/button";

type Props = {
  text: string;
  className: string;
  type?: "button" | "submit";
  submittingText?: string;
  isSubmitting?: boolean;
  children?: React.ReactNode;
};

export default function SubmitButton({
  text,
  className,
  type = "submit",
  submittingText,
  isSubmitting,
  children,
}: Props) {
  return (
    <Button type={type} className={className} disabled={isSubmitting}>
      {children}
      {isSubmitting ? submittingText : text}
    </Button>
  );
}
