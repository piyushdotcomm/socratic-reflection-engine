"use client";

import { Sidebar } from "@/components/sidebar";
import { ChatPanel } from "@/components/chat";

export default function HomePage() {
  return (
    <main className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <ChatPanel />
    </main>
  );
}
