import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  console.log(process.env.OPEN_AI_API_KEY_NEW);

  return (
    <header className="px-5 md:px-24 py-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1>AI BLOGGER APP</h1>
        </Link>
        <Button size="sm" variant="ghost">
          Sign In
        </Button>
      </div>
    </header>
  );
}
