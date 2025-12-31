import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <Suspense fallback={<div className="h-16 border-b border-border bg-card" />}>
          <Header />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Suspense fallback={<div className="text-white p-8">Loading dashboard...</div>}>
            <Dashboard />
          </Suspense>
        </main>
      </div>
    </>
  );
}
