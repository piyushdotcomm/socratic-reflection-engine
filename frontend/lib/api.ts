import {
  StartSessionRequest,
  StartSessionResponse,
  RespondRequest,
  RespondResponse,
  SessionSummary,
  SessionHistory,
  StrategiesResponse,
} from "@/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(
      (error as { detail?: string }).detail ?? `Request failed: ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

export const api = {
  startSession: (body: StartSessionRequest): Promise<StartSessionResponse> =>
    request<StartSessionResponse>("/reflect/start", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  respond: (body: RespondRequest): Promise<RespondResponse> =>
    request<RespondResponse>("/reflect/respond", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getHistory: (sessionId: string): Promise<SessionHistory> =>
    request<SessionHistory>(`/reflect/history/${sessionId}`),

  listSessions: (): Promise<{ sessions: SessionSummary[] }> =>
    request<{ sessions: SessionSummary[] }>("/sessions/"),

  listStrategies: (): Promise<StrategiesResponse> =>
    request<StrategiesResponse>("/strategies/"),
};
