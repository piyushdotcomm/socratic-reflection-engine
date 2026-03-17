"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReflectionStore } from "@/lib/store";
import { AgeGroup } from "@/lib/types";

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "child", label: "Child (under 12)" },
  { value: "teen", label: "Teen (12–17)" },
  { value: "adult", label: "Adult (18+)" },
];

export function AgeGroupSelector() {
  const { ageGroup, setAgeGroup, sessionId } = useReflectionStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">Age Group</label>
      <Select
        value={ageGroup}
        onValueChange={(value) => setAgeGroup(value as AgeGroup)}
        disabled={!!sessionId}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose age group" />
        </SelectTrigger>
        <SelectContent>
          {AGE_GROUPS.map((a) => (
            <SelectItem key={a.value} value={a.value}>
              {a.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
