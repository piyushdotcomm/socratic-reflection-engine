"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { useReflectionStore } from "@/lib/store";
import { Brain } from "lucide-react";

export function ChatWindow() {
  const { messages, isLoading } = useReflectionStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400 p-8">
        <div className="bg-slate-100 p-4 rounded-full">
          <Brain className="w-8 h-8" />
        </div>
        <div className="text-center">
          <p className="font-medium text-slate-600">Ready to reflect</p>
          <p className="text-sm mt-1">
            Describe your project below to start a guided reflection session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-6 py-4">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
