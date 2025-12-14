"use client";

import { motion, MotionProps } from "motion/react";
import { Card } from "@/components/ui/card";
import { ComponentProps } from "react";

type MotionCardProps = ComponentProps<typeof Card> & {
  motionProps?: MotionProps;
};

export default function MotionCard({
  motionProps,
  ...cardProps
}: MotionCardProps) {
  return (
    <motion.div {...motionProps}>
      <Card {...cardProps} />
    </motion.div>
  );
}
