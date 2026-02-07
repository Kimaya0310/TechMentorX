import Link from "next/link";
import { Logo } from "./logo";
import { Github, Linkedin, Twitter } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-secondary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <Logo href="/" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SocialSync. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
