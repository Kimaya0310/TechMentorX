import { HandHeart } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

export const Logo: FC<{ href?: string; className?: string }> = ({ href = "/", className }) => {
  return (
    <Link href={href} className={`flex items-center gap-2 ${className}`}>
      <HandHeart className="h-7 w-7 text-accent" />
      <span className="font-headline text-xl font-bold text-primary">
        Social Bridge
      </span>
    </Link>
  );
};
