export type Strategy = "gibbs" | "kolb" | "socratic";
export type AgeGroup = "child" | "teen" | "adult";
export type LLMProvider = "gemini" | "groq";
export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
  created_at?: string;
}

export interface StartSessionRequest {
  user_id?: string;
  project_type: string;
  strategy: Strategy;
  age_group: AgeGroup;
  llm_provider: LLMProvider;
}

export interface StartSessionResponse {
  session_id: string;
  strategy: Strategy;
  opening_question: string;
}

export interface RespondRequest {
  session_id: string;
  content: string;
}

export interface RespondResponse {
  response: string;
  session_id: string;
}

export interface SessionSummary {
  session_id: string;
  project_type: string;
  strategy: Strategy;
  age_group: AgeGroup;
  created_at: string;
}

export interface SessionHistory {
  session_id: string;
  strategy: Strategy;
  project_type: string;
  age_group: AgeGroup;
  messages: Message[];
}

export interface StrategyInfo {
  id: Strategy;
  name: string;
  description: string;
  best_for: string;
}

export interface StrategiesResponse {
  strategies: StrategyInfo[];
}

export interface APIError {
  detail: string;
}
