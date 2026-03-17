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
    <aside className="w-1/3 min-w-[320px] max-w-[420px] h-screen bg-editorial-bg-alt border-r border-editorial-border flex flex-col p-8 gap-8 shadow-[1px_0_3px_rgba(0,0,0,0.02)]">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <div className="bg-editorial-accent text-editorial-bg p-2 rounded-sm shadow-sm">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif font-medium text-editorial-text text-lg leading-tight tracking-tight">
            Socratic Reflection
          </h1>
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
            <span className="text-xs text-editorial-text-light font-medium">
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
        <p className="text-xs text-editorial-text-lighter">
          Configure your session above, then describe your project to begin.
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto">
        <Link
          href="/history"
          className="text-xs text-editorial-text-lighter hover:text-editorial-text-light underline underline-offset-2"
        >
          View session history →
        </Link>
      </div>
    </aside>
  );
}
