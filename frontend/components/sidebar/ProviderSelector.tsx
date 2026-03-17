"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReflectionStore } from "@/lib/store";
import { LLMProvider } from "@/lib/types";

const PROVIDERS: { value: LLMProvider; label: string; model: string }[] = [
  { value: "gemini", label: "Google Gemini", model: "gemini-2.0-flash" },
  { value: "groq", label: "Groq", model: "llama-3.3-70b" },
];

export function ProviderSelector() {
  const { provider, setProvider, sessionId } = useReflectionStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-200">AI Provider</label>
      <Select
        value={provider}
        onValueChange={(value) => setProvider(value as LLMProvider)}
        disabled={!!sessionId}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose provider" />
        </SelectTrigger>
        <SelectContent>
          {PROVIDERS.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              <div className="flex flex-col">
                <span className="font-medium">{p.label}</span>
                <span className="text-xs text-text-300">{p.model}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
