"use client";

import { StrategySelector } from "./StrategySelector";
import { AgeGroupSelector } from "./AgeGroupSelector";
import { ProviderSelector } from "./ProviderSelector";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReflectionStore } from "@/lib/store";
import { Brain } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const { sessionId, resetSession, strategy, ageGroup, provider } =
    useReflectionStore();

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col p-6 gap-6">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <div className="bg-slate-900 text-white p-2 rounded-lg">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-900 text-sm leading-tight">
            Socratic Reflection
          </h1>
          <p className="text-xs text-slate-500">Sugar Labs · GSoC 2026</p>
        </div>
      </div>

      <Separator />

      {/* Session config */}
      <div className="space-y-5">
        <StrategySelector />
        <AgeGroupSelector />
        <ProviderSelector />
      </div>

      <Separator />

      {/* Active session status */}
      {sessionId ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-600 font-medium">
              Session Active
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs capitalize">
              {strategy}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {ageGroup}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {provider}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={resetSession}
          >
            New Session
          </Button>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Configure your session above, then describe your project to begin.
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto">
        <Link
          href="/history"
          className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2"
        >
          View session history →
        </Link>
      </div>
    </aside>
  );
}
