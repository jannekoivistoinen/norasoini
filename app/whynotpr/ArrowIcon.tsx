"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

type Props = { className?: string };

const motion =
  "h-3 w-3 shrink-0 transition-transform duration-300 ease-out";

export function ArrowLeftIcon({ className }: Props) {
  return (
    <FontAwesomeIcon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon={faArrowLeft as any}
      className={cn(motion, "group-hover:-translate-x-[10px]", className)}
      aria-hidden
    />
  );
}

export function ArrowRightIcon({ className }: Props) {
  return (
    <FontAwesomeIcon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon={faArrowRight as any}
      className={cn(motion, "group-hover:translate-x-[10px]", className)}
      aria-hidden
    />
  );
}
