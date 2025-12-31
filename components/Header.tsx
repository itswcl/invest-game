"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("ticker") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?ticker=${query.trim().toUpperCase()}`);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-8">
      <div className="flex flex-1 items-center">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-full border border-border bg-zinc-950/50 py-2 pl-10 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all"
            placeholder="Search tickers (e.g. AAPL, TSLA)..."
          />
        </form>
      </div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
        </button>
        <div className="h-6 w-px bg-border" aria-hidden="true" />
        <button className="flex items-center gap-x-4 p-1.5 hover:bg-muted/50 rounded-full transition-colors">
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
