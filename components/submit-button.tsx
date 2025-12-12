"use client";

import { Button } from "./ui/button";

type Props = {
  text: string;
  className: string;
  textClassName?: string;
  type?: "button" | "submit";
  submittingText?: string;
  isSubmitting?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function SubmitButton({
  text,
  className,
  textClassName,
  type = "submit",
  submittingText,
  isSubmitting,
  children,
  onClick,
}: Props) {
  return (
    <Button
      type={type}
      className={className}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {children}

      <span className={textClassName}>
        {isSubmitting ? submittingText : text}
      </span>
    </Button>
  );
}
