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

const PROVIDERS: { value: LLMProvider; label: string; model: string; desc: string }[] = [
  { value: "featherless-120b", label: "Featherless (Default)", model: "gpt-oss-120b", desc: "Deep reflection, complex cycles, adults" },
  { value: "featherless-20b", label: "Featherless Fast", model: "gpt-oss-20b", desc: "Quick dialogue, teens/kids" },
  { value: "groq", label: "Groq", model: "Llama 3.3 70B", desc: "Ultra-fast responses, best UX" },
  { value: "gemini", label: "Google Gemini", model: "Gemini 2.0 Flash", desc: "Free tier, multimodal future" },
];

export function ProviderSelector() {
  const { provider, setProvider, sessionId } = useReflectionStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-editorial-text-light">AI Provider</label>
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
            <SelectItem key={p.value} value={p.value} className="py-2">
              <div className="flex flex-col">
                <span className="font-medium">{p.label} - {p.model}</span>
                <span className="text-xs text-editorial-text-lighter">{p.desc}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
