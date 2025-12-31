"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Newspaper, 
  Settings, 
  Sparkles 
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Watchlist", href: "#", icon: TrendingUp },
  { name: "News", href: "#", icon: Newspaper },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 shrink-0 items-center px-6 gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          GeminiInvest
        </span>
      </div>
      
      <div className="flex flex-1 flex-col gap-y-7 px-4 py-4">
        <nav className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "group flex gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon
                  className={clsx(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto">
          <div className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 border border-border">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-primary" />
              Pro Plan
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Get real-time data & AI insights.
            </p>
            <button className="mt-3 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
