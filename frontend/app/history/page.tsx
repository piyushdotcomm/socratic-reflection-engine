"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { SessionSummary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listSessions()
      .then((data) => setSessions(data.sessions))
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Failed to load sessions"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to chat
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Session History
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Your 20 most recent reflection sessions.
        </p>

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && sessions.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="font-medium">No sessions yet</p>
            <p className="text-sm mt-1">
              Start a reflection session to see it here.
            </p>
          </div>
        )}

        {/* Sessions list */}
        {!loading && !error && sessions.length > 0 && (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-800 line-clamp-2 mb-3">
                  {session.project_type}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {session.strategy}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {session.age_group}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {new Date(session.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
