"use client";

import { ChatWindow } from "./ChatWindow";
import { InputBar } from "./InputBar";
import { useReflectionStore } from "@/lib/store";

export function ChatPanel() {
  const { error } = useReflectionStore();

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-bg-0">
      <ChatWindow />
      {error && (
        <div className="px-6 py-2 bg-red-50 border-t border-red-200">
          <p className="text-xs text-red-600 text-center max-w-3xl mx-auto">
            ⚠️ {error}
          </p>
        </div>
      )}
      <InputBar />
    </div>
  );
}
