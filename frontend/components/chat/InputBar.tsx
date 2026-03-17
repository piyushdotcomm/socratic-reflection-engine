"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useReflectionStore } from "@/lib/store";
import { api } from "@/lib/api";

export function InputBar() {
  const [input, setInput] = useState<string>("");
  const {
    sessionId,
    strategy,
    ageGroup,
    provider,
    isLoading,
    messages,
    addMessage,
    setSessionId,
    setLoading,
    setError,
  } = useReflectionStore();

  const isFirstMessage = messages.length === 0;

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setError(null);
    setLoading(true);

    try {
      if (isFirstMessage) {
        addMessage({ role: "user", content: trimmed });
        const res = await api.startSession({
          project_type: trimmed,
          strategy,
          age_group: ageGroup,
          llm_provider: provider,
        });
        setSessionId(res.session_id);
        addMessage({ role: "assistant", content: res.opening_question });
      } else {
        if (!sessionId) return;
        addMessage({ role: "user", content: trimmed });
        const res = await api.respond({
          session_id: sessionId,
          content: trimmed,
        });
        addMessage({ role: "assistant", content: res.response });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="border-t border-editorial-border bg-transparent px-6 py-4">
      <div className="max-w-3xl mx-auto flex gap-3 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isFirstMessage
              ? "Describe what you built or worked on today..."
              : "Type your response..."
          }
          disabled={isLoading}
          className="flex-1 bg-editorial-bg border-editorial-border focus-visible:ring-editorial-accent"
        />
        <Button
          onClick={() => void handleSend()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="bg-editorial-text hover:bg-editorial-text-light shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
