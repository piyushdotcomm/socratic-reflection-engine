"use client";

import { useReflectionStore } from "@/lib/store";
import { api } from "@/lib/api";
import ClaudeChatInput, { PastedContent } from "@/components/ui/claude-style-chat-input";

export function InputBar() {
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

  const handleClaudeSend = async (text: string) => {
    if (!text || isLoading) return;

    setError(null);
    setLoading(true);

    try {
      if (isFirstMessage) {
        addMessage({ role: "user", content: text });
        const res = await api.startSession({
          project_type: text,
          strategy,
          age_group: ageGroup,
          llm_provider: provider,
        });
        setSessionId(res.session_id);
        addMessage({ role: "assistant", content: res.opening_question });
      } else {
        if (!sessionId) return;
        addMessage({ role: "user", content: text });
        const res = await api.respond({
          session_id: sessionId,
          content: text,
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

  return (
    <div className="px-6 py-4 flex flex-col items-center bg-transparent">
      <div className="w-full max-w-3xl mx-auto">
      <ClaudeChatInput
          isLoading={isLoading}
          placeholder={
            isFirstMessage
              ? "Describe what you built or worked on today..."
              : "Type your reflection response..."
          }
          onSendMessage={(data) => {
             const textToProcess = [data.message, ...data.pastedContent.map((c: PastedContent) => c.content)].join('\n\n').trim();
             if (textToProcess) {
                void handleClaudeSend(textToProcess);
             }
          }}
      />
      </div>
    </div>
  );
}
