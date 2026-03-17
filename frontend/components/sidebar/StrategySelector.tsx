"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReflectionStore } from "@/lib/store";
import { Strategy } from "@/lib/types";

const STRATEGIES: { value: Strategy; label: string; description: string }[] = [
  {
    value: "gibbs",
    label: "Gibbs Reflective Cycle",
    description: "6-stage structured reflection",
  },
  {
    value: "kolb",
    label: "Kolb Experiential Learning",
    description: "4-stage learning cycle",
  },
  {
    value: "socratic",
    label: "Socratic Questioning",
    description: "Deep critical thinking",
  },
];

export function StrategySelector() {
  const { strategy, setStrategy, sessionId } = useReflectionStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-200">
        Reflection Strategy
      </label>
      <Select
        value={strategy}
        onValueChange={(value) => setStrategy(value as Strategy)}
        disabled={!!sessionId}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose strategy" />
        </SelectTrigger>
        <SelectContent>
          {STRATEGIES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              <div className="flex flex-col">
                <span className="font-medium">{s.label}</span>
                <span className="text-xs text-text-300">{s.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {sessionId && (
        <p className="text-xs text-text-400">
          Cannot change during active session
        </p>
      )}
    </div>
  );
}
