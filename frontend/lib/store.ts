import { create } from "zustand";
import { Message, Strategy, AgeGroup, LLMProvider } from "@/lib/types";

interface ReflectionState {
  // Session config (sidebar selections)
  strategy: Strategy;
  ageGroup: AgeGroup;
  provider: LLMProvider;

  // Active session
  sessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  // Project input (before session starts)
  projectInput: string;

  // Actions
  setStrategy: (strategy: Strategy) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setProvider: (provider: LLMProvider) => void;
  setProjectInput: (input: string) => void;
  setSessionId: (id: string) => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetSession: () => void;
}

export const useReflectionStore = create<ReflectionState>((set) => ({
  strategy: "gibbs",
  ageGroup: "teen",
  provider: "featherless-120b",
  sessionId: null,
  messages: [],
  isLoading: false,
  error: null,
  projectInput: "",

  setStrategy: (strategy) => set({ strategy }),
  setAgeGroup: (ageGroup) => set({ ageGroup }),
  setProvider: (provider) => set({ provider }),
  setProjectInput: (projectInput) => set({ projectInput }),
  setSessionId: (sessionId) => set({ sessionId }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetSession: () =>
    set({
      sessionId: null,
      messages: [],
      isLoading: false,
      error: null,
      projectInput: "",
    }),
}));
